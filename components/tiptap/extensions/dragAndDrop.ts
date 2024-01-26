import { Extension } from "@tiptap/core";

import { NodeSelection, Plugin } from "@tiptap/pm/state";
// @ts-ignore
import { __serializeForClipboard, EditorView } from "@tiptap/pm/view";

export interface DragHandleOptions {
  /**
   * The width of the drag handle
   */
  dragHandleWidth: number;
}
function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect();

  return {
    top: data.top,
    left: data.left,
    width: data.width,
  };
}

function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document.elementsFromPoint(coords.x, coords.y).find(
    (elem: Element) =>
      elem.parentElement?.matches?.(".ProseMirror") ||
      elem.matches("div[data-image='']") || // <--- 여기서 img 태그를 찾습니다.
      elem.matches("div[data-youtube='']") || // <--- 여기서 iframe 태그를 찾습니다.
      elem.matches(
        [
          "li",
          "p:not(:first-child)",
          "pre",
          "blockquote",
          "h1, h2, h3, h4, h5, h6",
        ].join(", ")
      )
  );
}

function nodePosAtDOM(node: Element, view: EditorView) {
  const boundingRect = node.getBoundingClientRect();
  return view.posAtCoords({
    left: boundingRect.left + 1,
    top: boundingRect.top + 1,
  })?.inside;
}

function DragHandle(options: DragHandleOptions) {
  function handleDragStart(event: DragEvent, view: EditorView) {
    // view.focus();

    if (!event.dataTransfer) return;

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth,
      y: event.clientY,
    });

    if (!(node instanceof Element)) return;

    const nodePos = nodePosAtDOM(node, view);
    if (nodePos == null || nodePos < 0) return;

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
    );

    const slice = view.state.selection.content();
    const { dom, text } = __serializeForClipboard(view, slice);
    event.dataTransfer.clearData();
    event.dataTransfer.setData("text/html", dom.innerHTML);
    event.dataTransfer.setData("text/plain", text);
    event.dataTransfer.effectAllowed = "copyMove";

    event.dataTransfer.setDragImage(node, 0, 0);
    view.dragging = { slice, move: event.ctrlKey };
  }

  function handleClick(event: MouseEvent, view: EditorView) {
    view.focus();

    view.dom.classList.remove("dragging");

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth,
      y: event.clientY,
    });

    if (!(node instanceof Element)) return;

    const nodePos = nodePosAtDOM(node, view);
    if (!nodePos) return;

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
    );
  }

  let dragHandleElement: HTMLElement | null = null;

  function hideDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.add("hidden");
    }
  }

  function showDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.remove("hidden");
    }
  }

  return new Plugin({
    view: (view) => {
      if (view.editable) {
        dragHandleElement = document.createElement("div");
        dragHandleElement.draggable = true;
        dragHandleElement.dataset.dragHandle = "";
        dragHandleElement.classList.add("drag-handle");
        dragHandleElement.addEventListener("dragstart", (e) => {
          handleDragStart(e, view);
        });

        dragHandleElement.addEventListener("click", (e) => {
          handleClick(e, view);
        });

        hideDragHandle();
        // view.dragging = { slice, move: event.ctrlKey };

        view?.dom?.parentElement?.appendChild(dragHandleElement);
      }

      return {
        destroy: () => {
          dragHandleElement?.remove?.();
          dragHandleElement = null;
        },
      };
    },
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {
          const node = nodeDOMAtCoords({
            x: event.clientX + 50 + options.dragHandleWidth,
            y: event.clientY,
          });
          if (!(node instanceof Element)) {
            hideDragHandle();
            return;
          }

          // if (node.tagName != "IMG" && node.tagName != "IFRAME") {
          const compStyle = window.getComputedStyle(node);
          const lineHeight = parseInt(compStyle.lineHeight, 10);
          const paddingTop = parseInt(compStyle.paddingTop, 10);
          const rect = absoluteRect(node);
          rect.top += (lineHeight - 24) / 2;
          rect.top += paddingTop;
          // // Li markers
          if (node.matches("ul:not([data-type=taskList]) li, ol li")) {
            rect.left -= options.dragHandleWidth;
          }
          rect.width = options.dragHandleWidth;

          if (!dragHandleElement) return;

          dragHandleElement.style.left = `${rect.left - rect.width}px`;
          dragHandleElement.style.top = `${rect.top}px`;
          showDragHandle();

          if (!view.editable) {
            return;
          }
          // }
        },

        dragover: (view, event) => {},
        keydown: () => {
          hideDragHandle();
        },
        mousewheel: () => {
          hideDragHandle();
        },
        // dragging class is used for CSS
        dragstart: (view, event) => {
          view.dom.classList.add("dragging");
        },
        drop: (view, event) => {
          // const node = nodeDOMAtCoords({
          //   x: event.clientX + 50,
          //   y: event.clientY,
          // });
          // event.preventDefault();
          view.dom.classList.remove("dragging");
        },
        dragend: (view) => {
          view.dom.classList.remove("dragging");
        },
      },
    },
  });
}

interface DragAndDropOptions {}

const DragAndDrop = Extension.create<DragAndDropOptions>({
  name: "dragAndDrop",

  addProseMirrorPlugins() {
    return [
      DragHandle({
        dragHandleWidth: 24,
      }),
    ];
  },
});

export default DragAndDrop;
