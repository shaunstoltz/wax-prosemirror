const blockLevelToDOM = node => {
  const attrs = node.attrs.track.length
    ? {
        class: node.attrs.class,
        "data-track": JSON.stringify(node.attrs.track)
      }
    : { class: node.attrs.class };
  return attrs;
};

export default {
  nodes: {
    doc: {
      content: "block+"
    },
    text: {
      group: "inline"
    },
    hard_break: {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{ tag: "br" }],
      toDOM() {
        return ["br"];
      }
    },
    paragraph: {
      group: "block",
      content: "inline*",
      attrs: {
        class: { default: "paragraph" },
        track: { default: [] }
      },
      parseDOM: [
        {
          tag: "p.paragraph",
          getAttrs(dom) {
            return {
              class: dom.getAttribute("class"),
              track: parseTracks(dom.dataset.track)
            };
          }
        }
      ],
      toDOM(node) {
        const attrs = blockLevelToDOM(node);
        return ["p", attrs, 0];
      }
    },
    footnote: {
      group: "inline",
      content: "inline*",
      inline: true,
      // This makes the view treat the node as a leaf, even though it
      // technically has content
      atom: true,
      toDOM: () => ["footnote"],
      parseDOM: [{ tag: "footnote" }]
    }
    // footnote: {
    //   group: "inline",
    //   content: "block+",
    //   inline: true,
    //   atom: true,
    //   toDOM: dom => {
    //     return ["footnote"];
    //   },
    //   parseDOM: [
    //     {
    //       tag: "footnote"
    //     }
    //   ]
    // },
  },
  marks: {}
};
