import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
    };
  }
}

export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

const Image = Node.create<ImageOptions>({
  name: "image",

  addOptions() {
    return {
      inline: false,
      allowBase64: true,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: false,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div[data-image] ${
          this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
        }`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt, title, width, height } = HTMLAttributes;

    // return [
    //   "div",
    //   { "data-image": "" },
    //   ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    // ];
    //2단
    return [
      "div",
      {
        "data-image-container": "",
        style: "width:100%; display:flex; justify-content:center;",
      },
      [
        "div",
        mergeAttributes(this.options.HTMLAttributes, {
          style: `width:${width}px; height:${height}px;`,
          "data-image": "",
          draggable: "false",
        }),
        [
          "img",
          mergeAttributes({ src, width, height }, this.options.HTMLAttributes),
        ],
      ],
    ];
    // 3단
    // return [
    //   "div",
    //   { "data-image-container": "" },
    //   [
    //     "div",
    //     mergeAttributes(this.options.HTMLAttributes, {
    //       style: `width:${width}px; height:${height}px;`,
    //       "data-image": "",
    //       draggable: "false",
    //     }),

    //     [
    //       "img",
    //       mergeAttributes({ src, alt, title }, this.options.HTMLAttributes),
    //       { style: "width:100%; height:auto" },
    //     ],
    //   ],
    // ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },
});

export default Image;
