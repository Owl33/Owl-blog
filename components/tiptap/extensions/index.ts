import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TiptapImage from "./Image";
import Document from "@tiptap/extension-document";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import { InputRule } from "@tiptap/core";
import SlashCommand from "./slashExtension";
import DragAndDrop from "./dragAndDrop";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";

// import Iframe from "./iframe";
import Youtube from "./youtube";
// import ResizableMedia from "./resize/ResizableMedia";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import resize from "./resize";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
// you can also register languages
const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("java", java);

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc ml-4 list-outside leading-3 mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal ml-4 list-outside leading-3 mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    // codeBlock: {
    //   HTMLAttributes: {
    //     class: "rounded-sm bg-slate-900 p-5 font-mono font-medium text-white",
    //   },
    // },
    codeBlock: false,
    code: {
      HTMLAttributes: {
        class: "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  resize,
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-stone-300",
    },
  }),
  CodeBlockLowlight.configure({
    lowlight: lowlight,
  }),
  // ResizableMedia,
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    },
  }),
  Youtube.configure({
    enableIFrameApi: false,
  }),
  TiptapImage.configure({
    // allowBase64: true,
    HTMLAttributes: {
      draggable: false,
      class: "rounded-2xl border ",
    },
  }),
  // TiptapImage.extend({
  //   addProseMirrorPlugins() {
  //     return [UploadImagesPlugin()];
  //   },
  // }).configure({
  //   allowBase64: true,
  //   HTMLAttributes: {
  //     class: "rounded-lg border border-stone-200",
  //   },
  // }),
  // UpdatedImage.configure({
  //   HTMLAttributes: {
  //     class: "rounded-lg border border-stone-200",
  //   },
  // }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "내용을 입력해주세요.";
    },
    includeChildren: true,
  }),
  TiptapUnderline,
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
  SlashCommand,
  DragAndDrop,
];
