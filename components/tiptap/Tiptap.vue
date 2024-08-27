<script setup lang="ts">
import { watchEffect, ref, watch, type PropType, computed } from "vue";
import { useEditor, EditorContent, type JSONContent, Extension } from "@tiptap/vue-3";
import { type EditorProps } from "@tiptap/pm/view";
import { Editor as EditorClass, isTextSelection } from "@tiptap/core";

import { defaultEditorContent } from "./lib/default-content";
import { defaultExtensions } from "./extensions";
import { defaultEditorProps } from "./lib/props";
import BubbleMenu from "./BubbleMenu/index.vue";
import { getPrevText } from "./lib/editor";

const props = defineProps({
  /**
   * The API route to use for the OpenAI completion API.
   * Defaults to "/api/generate".
   */
  content: {
    type: Object as PropType<JSONContent>,
  },
  editable: {
    type: Boolean,
  },
  completionApi: {
    type: String,
    default: "/api/generate",
  },
  /**
   * Additional classes to add to the editor container.
   * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg".
   */
  className: {
    type: String,
    default: "relative w-100 pa-4 mx-auto ",
  },
  /**
   * The default value to use for the editor.
   * Defaults to defaultEditorContent.
   */
  defaultValue: {
    type: Object as PropType<JSONContent>,
    // default: defaultEditorContent,
  },
  /**
   * A list of extensions to use for the editor, in addition to the default Novel extensions.
   * Defaults to [].
   */
  extensions: {
    type: Array as PropType<Extension[]>,
    default: [],
  },
  /**
   * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
   * Defaults to {}.
   */
  editorProps: {
    type: Object as PropType<EditorProps>,
    default: {},
  },
  /**
   * A callback function that is called whenever the editor is updated.
   * Defaults to () => {}.
   */
  onUpdate: {
    type: Function as PropType<(editor?: EditorClass) => void | Promise<void>>,
    default: () => {},
  },
  /**
   * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
   * Defaults to () => {}.
   */
  onDebouncedUpdate: {
    type: Function as PropType<(editor?: EditorClass) => void | Promise<void>>,
    default: () => {},
  },
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration: {
    type: Number,
    default: 750,
  },
  /**
   * The key to use for storing the editor's value in local storage.
   * Defaults to "novel__content".
   */
  storageKey: {
    type: String,
    default: "novel__content",
  },
  resize: {
    type: Boolean,
    default: true,
  },
});
const extensions = ref([...defaultExtensions]);

if (!props.resize) {
  extensions.value = extensions.value.filter((extension) => extension.name != "resize");
}
const computedContent = computed(() => (props.content ? props.content : props.defaultValue));
const computedEditable = computed(() => props.editable);
// const content = ref(defaultEditorContent);
// const debouncedUpdate = useDebounceFn(({ editor }) => {
//   const json = editor.getJSON();
//   content.value = json;

//   props.onDebouncedUpdate(editor);
// }, props.debounceDuration);

const editor = useEditor({
  extensions: extensions.value,
  editorProps: {
    ...defaultEditorProps,
    ...props.editorProps,
  },
  editable: computedEditable.value == false ? false : true,
  content: computedContent.value,
  // onUpdate: (e) => {
    // const selection = e.editor.state.selection;
    // const lastTwo = getPrevText(e.editor, {
    //   chars: 2,
    // });
    // Run the completion API if the user types "++" at the end of the document.
    // if (lastTwo === "++" && !isLoading.value) {
    //   e.editor.commands.deleteRange({
    //     from: selection.from - 2,
    //     to: selection.from,
    //   });
    //   complete(
    //     getPrevText(e.editor, {
    //       chars: 5000,
    //     })
    //   );
    // } else {
    //   props.onUpdate(e.editor);
    // debouncedUpdate(e);
    // }
  // },
  // autofocus: "start",
});
// const { complete, completion, isLoading, stop } = useCompletion({
//   id: "novel-vue",
//   api: props.completionApi,
//   // onFinish: (_prompt, completion) => {
//   //   editor.value?.commands.setTextSelection({
//   //     from: editor.value.state.selection.from - completion.length,
//   //     to: editor.value.state.selection.from,
//   //   });
//   // },
//   // onError: (err) => {
//   // },
// });

// // Insert chunks of the generated text
// watch(
//   () => completion.value,
//   (newCompletion, oldCompletion) => {
//     const diff = newCompletion?.slice(oldCompletion?.length);
//     if (diff) {
//       editor.value?.commands.insertContent(diff);
//     }
//   }
// );

// if user presses escape or cmd + z and it's loading,
// stop the request, delete the completion, and insert back the "++"
// const onKeyDown = (e: KeyboardEvent) => {
//   if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
//     stop();
//     if (e.key === "Escape") {
//       editor.value?.commands.deleteRange({
//         from: editor.value.state.selection.from - completion.value.length,
//         to: editor.value.state.selection.from,
//       });
//     }
//     editor.value?.commands.insertContent("++");
//   }
// };

// const mousedownHandler = (e: MouseEvent) => {
//   e.preventDefault();
//   e.stopPropagation();
//   stop();
//   if (window.confirm("AI writing paused. Continue?")) {
//     complete(editor.value?.getText() || "");
//   }
// };

// watch(
//   () => isLoading.value,
//   (isLoading) => {
//     if (isLoading) {
//       // document.addEventListener("keydown", onKeyDown);
//       // window.addEventListener("mousedown", mousedownHandler);
//     } else {
//       // document.removeEventListener("keydown", onKeyDown);
//       // window.removeEventListener("mousedown", mousedownHandler);
//     }
//   }
// );

// Load the editor content from local storage on mount.
// const hydrated = ref(false);
// watchEffect(() => {
//   if (editor.value && content.value && !hydrated.value) {
//     // editor.value.commands.setContent(content.value);
//     hydrated.value = true;
//   }
// });

const nodeDropHideBubble = (items: any): boolean => {
  return Array.from(items).some((child: any) => {
    if (child.classList.contains("ProseMirror-selectednode")) {
      return true;
    } else if (child.children.length > 0) {
      return nodeDropHideBubble(child.children);
    }
  });
};
const url = "https://www.youtube.com/watch?v=XDDr7V_6LOo-Q";

defineExpose({
  getJSON: () => editor.value?.getJSON(),
  getHTML: () => editor.value?.getHTML(),
  getText: () => editor.value?.getText(),
});
</script>
<template>
  <!-- <v-btn @click="test">test</v-btn> -->

  <div
    @click="editor?.chain().focus().run()"
    :class="className">
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      :animation="true"
      :shouldShow="
        //@ts-ignore
        ({ editor, view, state, from, to }) => {
          if (nodeDropHideBubble(view.dom.children)) {
            return false;
          } else {
            const { doc, selection } = state;
            const { empty } = selection;
            const isEmptyTextBlock =
              !doc.textBetween(from, to).length && isTextSelection(state.selection);
            const hasEditorFocus = view.hasFocus();

            if (!hasEditorFocus || empty || isEmptyTextBlock || !editor.isEditable) {
              return false;
            }

            return true;
          }
        }
      " />
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss">
.drag-handle {
  position: fixed;
  opacity: 1;
  transition: opacity ease-in 0.2s;
  border-radius: 0.25rem;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(0, 0, 0, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: calc(0.5em + 0.375rem) calc(0.5em + 0.375rem);
  background-repeat: no-repeat;
  background-position: center;
  width: 1.2rem;
  height: 1.5rem;
  z-index: 50;
  cursor: grab;

  &:hover {
    background-color: var(--novel-stone-100);
    transition: background-color 0.2s;
  }

  &:active {
    background-color: var(--novel-stone-200);
    transition: background-color 0.2s;
  }

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    display: none;
    pointer-events: none;
  }
}

.prose-lg :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0.775em;
  margin-bottom: 0.775em;
}

.ProseMirror div[data-youtube-video] {
  transition: filter 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  &.ProseMirror-selectednode {
    outline: 3px solid #5abbf7;
    filter: brightness(90%);
  }
}

.dark-theme .drag-handle {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(255, 255, 255, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;

  width: 10px;
  height: 100%;
  cursor: col-resize;
  opacity: 1;
  border-radius: 16px;

  background-color: rgb(65, 166, 209);

  &.hidden-handle {
    animation: hiddenHandle 0.5s forwards;
    pointer-events: none;
  }

  &.active-handle {
    // opacity: 1;
    animation: showHandle 0.5s forwards;
    pointer-events: initial;
  }
}

@keyframes showHandle {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes hiddenHandle {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.resize-iframe-cover {
  display: block;
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  left: 0;

  &.show-cover {
    display: block;
  }
}

.ProseMirror {
  li {
    align-items: center;

    label {
      margin-right: 8px;
    }
  }

  h2 {
    font-size: 2rem !important;
  }
}

div[data-image=""] {
  img {
    border-radius: 16px;
    width: 100%;
    height: 100%;
  }
}

div[data-youtube=""] {
  // position: relative;
  // position: relative;
  // height: 50vh;
  // padding-bottom: 56.5%;
  height: 480px;

  iframe {
    border-radius: 16px;

    height: 100%;
    width: 100%;
    // z-index: 10000;

    // position: absolute;
    // width: 100%; /* 부모에 맞게 꽉 채운다. */
    // height: 100%;
  }

  // padding-bottom: 56.25%;
}

:root {
  --novel-black: rgb(0 0 0);
  --novel-white: rgb(255 255 255);
  --novel-stone-50: rgb(250 250 249);
  --novel-stone-100: rgb(245 245 244);
  --novel-stone-200: rgb(231 229 228);
  --novel-stone-300: rgb(214 211 209);
  --novel-stone-400: rgb(168 162 158);
  --novel-stone-500: rgb(120 113 108);
  --novel-stone-600: rgb(87 83 78);
  --novel-stone-700: rgb(68 64 60);
  --novel-stone-800: rgb(41 37 36);
  --novel-stone-900: rgb(28 25 23);

  --novel-highlight-default: #ffffff;
  --novel-highlight-purple: #f6f3f8;
  --novel-highlight-red: #fdebeb;
  --novel-highlight-yellow: #fbf4a2;
  --novel-highlight-blue: #c1ecf9;
  --novel-highlight-green: #acf79f;
  --novel-highlight-orange: #faebdd;
  --novel-highlight-pink: #faf1f5;
  --novel-highlight-gray: #f1f1ef;

  --font-title: "Cal Sans", sans-serif;
}

.dark-theme {
  --novel-black: rgb(255 255 255);
  --novel-white: rgb(25 25 25);
  --novel-stone-50: rgb(35 35 34);
  --novel-stone-100: rgb(41 37 36);
  --novel-stone-200: rgb(66 69 71);
  --novel-stone-300: rgb(112 118 123);
  --novel-stone-400: rgb(160 167 173);
  --novel-stone-500: rgb(193 199 204);
  --novel-stone-600: rgb(212 217 221);
  --novel-stone-700: rgb(229 232 235);
  --novel-stone-800: rgb(232 234 235);
  --novel-stone-900: rgb(240, 240, 241);

  --novel-highlight-default: #000000;
  --novel-highlight-purple: #3f2c4b;
  --novel-highlight-red: #5c1a1a;
  --novel-highlight-yellow: #5c4b1a;
  --novel-highlight-blue: #1a3d5c;
  --novel-highlight-green: #1a5c20;
  --novel-highlight-orange: #5c3a1a;
  --novel-highlight-pink: #5c1a3a;
  --novel-highlight-gray: #3a3a3a;
}

// @font-face {
//   font-family: "Cal Sans";
//   src: local("Cal Sans"), url(CalSans-SemiBold.otf) format("otf");
// }

.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap pre {
  background: #0d0d0d;
  color: #fff;
  // font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
  }

  .hljs-comment,
  .hljs-quote {
    color: #616161;
  }

  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-tag,
  .hljs-name,
  .hljs-regexp,
  .hljs-link,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #f98181;
  }

  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: #fbbc88;
  }

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: #b9f18d;
  }

  .hljs-title,
  .hljs-section {
    color: #faf594;
  }

  .hljs-keyword,
  .hljs-attr,
  .hljs-selector-tag {
    color: #70cff8;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: 700;
  }
}
</style>
