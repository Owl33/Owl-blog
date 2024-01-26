import { mergeAttributes, Node, Extension } from "@tiptap/core";
import { VueNodeViewRenderer, nodeViewProps } from "@tiptap/vue-3";
import { NodeSelection, Plugin } from "@tiptap/pm/state";

let resizeHandleRight: HTMLDivElement;
let hoverContainer: Element | undefined;
let initialWidth: number;
let initialHeight: number;
let initialMouseX: number;
let resizeCover: HTMLDivElement;
let mediaElement: HTMLIFrameElement | HTMLImageElement;

// let initialMouseY: number;
let aspectRatio = 1;
let isResizing = false;
let maxWidth = 0;

const startResize = (e: any, view: any) => {
  if (
    !isResizing ||
    !hoverContainer ||
    !(hoverContainer instanceof HTMLElement)
  )
    return;

  const dx = e.clientX - initialMouseX;
  let newWidth = Math.max(initialWidth + dx, 300);
  // width가 maxSize를 초과하지 않도록 함
  newWidth = Math.min(newWidth, maxWidth);

  // height를 width에 맞춰 조절
  let newHeight;

  if (hoverContainer.getAttribute("data-image") !== null) {
    // newHeight = newWidth / aspectRatio;

    // height가 maxSize를 초과하지 않도록 함
    // newHeight = Math.min(newHeight, 300);
    mediaElement = hoverContainer.querySelector("img") as HTMLImageElement;

    const dx = e.clientX - initialMouseX;

    newWidth = Math.max(initialWidth + dx, 300);

    // width가 maxSize를 초과하지 않도록 함
    newWidth = Math.min(newWidth, maxWidth);

    // height를 width에 맞춰 조절
    newHeight = newWidth / aspectRatio;

    // height가 maxSize를 초과하지 않도록 함
    newHeight = Math.min(newHeight, maxWidth);
    //  hoverElement.style.width= `${newWidth}px`;

    // height도 변경
    //  hoverElement.style.height= `${newHeight}px`;
    //
    const pos = view.state.selection.from;

    // // Get the attributes of the selected image node.
    const { node } = view.state.selection;
    // const { src, alt, title } = node.attrs;
    // // // Update the width and height attributes of the image node.
    const transaction = view.state.tr.setNodeMarkup(pos, undefined, {
      ...node.attrs,
      width: newWidth,
      height: newHeight,
    });
    // node.attrs.width = newWidth;
    // node.attrs.height = newHeight;
    view.dispatch(transaction);
  } else if (hoverContainer.getAttribute("data-youtube") !== null) {
    newWidth = Math.max(initialWidth + dx, 300);

    // width가 maxSize를 초과하지 않도록 함
    newWidth = Math.min(newWidth, maxWidth);
    newHeight = newWidth / aspectRatio;

    // height가 maxSize를 초과하지 않도록 함
    newHeight = Math.min(newHeight, maxWidth);
    // newHeight = newWidth * (9 / 16);
    // height가 maxSize를 초과하지 않도록 함
    // newHeight = Math.min(newHeight, maxWidth * (9 / 16)); // maxHeight는 적절한 최대 높이 값으로 설정해야 합니다.
    mediaElement = hoverContainer.querySelector("iframe") as HTMLIFrameElement;
    const { node } = view.state.selection;
    if (node) {
      node.attrs.width = newWidth;
      node.attrs.height = newHeight;
    }

    // const pos = view.state.selection.from;
    // const transaction = view.state.tr.setNodeMarkup(pos, undefined, {
    //   ...node.attrs,
    //   width: newWidth,
    //   height: newHeight,
    // });
    // view.dispatch(transaction);

    hoverContainer.style.width = `${newWidth}px`;
    hoverContainer.style.height = `${newHeight}px`;
  }

  // height도 변경
};

const onResize = (e: any, view: any) => {
  if (resizeCover) {
    resizeCover.classList.add("show-cover");
  }
  if (maxWidth != view.dom.clientWidth) {
    maxWidth = view.dom.clientWidth;
  }
  if (hoverContainer instanceof HTMLElement) {
    initialWidth = hoverContainer.offsetWidth;
    initialHeight = hoverContainer.offsetHeight;
    aspectRatio = initialWidth / initialHeight; // 가로세로 비율 계산
  }
  initialMouseX = e.clientX;
  isResizing = true;

  // mousemove 이벤트 리스너 추가
  document.addEventListener("mousemove", (e) => startResize(e, view));
  document.addEventListener("mouseup", (e) => {
    isResizing = false;
    if (resizeCover) {
      resizeCover.classList.remove("show-cover");
    }
  });
};

const ResizeHandle = () => {
  return new Plugin({
    view: (view) => {
      // const resizeHandleLeft = document.createElement("div");
      // resizeHandleLeft.classList.add("resize-handle", "resize-handle-left");
      resizeHandleRight = document.createElement("div");
      resizeHandleRight.classList.add("resize-handle");

      //   resizeHandle.draggable = true;
      //   resizeHandle.draggable = ;

      // resizeHandleRight
      // resizeContainer.appendChild(handle);
      resizeHandleRight.addEventListener("mousedown", (event) =>
        onResize(event, view)
      );

      return {
        update: (view, prevState) => {
          const imgAndIframeElements = view.dom.querySelectorAll(
            "[data-image=''], [data-youtube='']"
          );
          // 이미지와 iframe 요소 선택

          imgAndIframeElements.forEach((element: Element) => {
            if (element instanceof HTMLDivElement) {
              element.style.position = "relative";
            }
            if (element.getAttribute("data-youtube") !== null) {
              resizeCover = document.createElement("div");
              resizeCover.classList.add("resize-iframe-cover");
              element.appendChild(resizeCover);
            }

            // 마우스 오버 이벤트 리스너 추가
            element.addEventListener("mouseover", function () {
              hoverContainer = element;
              let handle = element.appendChild(resizeHandleRight);

              //   let handle = element.querySelector("resize-handle");
              // 현재 요소의 위치 정보 가져오기
              handle.classList.remove("hidden-handle");
              handle.classList.add("active-handle");
              //   handle.classList.add("resize-handle");
              //   const pos = view.posAtDOM(element);
              // 해당 위치에 resize 노드 삽입
              //   const transaction = view.state.tr.insert(pos, schema.node('resize'));
              //   view.dispatch(transaction);
            });
            element.addEventListener("mouseout", function () {
              if (!isResizing) {
                hoverContainer = undefined;
              }

              let handle = element.appendChild(resizeHandleRight);
              /* ... */
              //   handle.classList.remove("resize-handle-active");
              handle.classList.remove("active-handle");
              handle.classList.add("hidden-handle");
            });
          });
        },
      };
    },
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {},
        keydown: () => {
          // hideDragHandle();
        },
        mousewheel: () => {
          // hideDragHandle();
        },
        // dragging class is used for CSS
        dragstart: (view, e) => {
          if (isResizing) {
            e.preventDefault();
          }
          //   e.preventDefault();
          //   e.preventDefault();
          //   view.dom.classList.add("dragging");
          // view.dom.classList.add("dragging");
        },
        drop: (view) => {
          // view.dom.classList.remove("dragging");
        },
        dragend: (view) => {
          // view.dom.classList.remove("dragging");
        },
      },
    },
  });
};

export default Extension.create({
  name: "resize",

  group: "block",
  addProseMirrorPlugins() {
    return [ResizeHandle()];
  },
});
