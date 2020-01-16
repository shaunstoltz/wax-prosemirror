const insertion = {
  attrs: {
    user: {
      default: 0
    },
    username: {
      default: ""
    },
    date: {
      default: 0
    },
    approved: {
      default: true
    }
  },
  inclusive: false,
  group: "track",
  parseDOM: [
    {
      tag: "span.insertion",
      getAttrs(dom) {
        return {
          user: parseInt(dom.dataset.user),
          username: dom.dataset.username,
          date: parseInt(dom.dataset.date),
          inline: true,
          approved: false
        };
      }
    },
    {
      tag: "span.approved-insertion",
      getAttrs(dom) {
        return {
          user: parseInt(dom.dataset.user),
          username: dom.dataset.username,
          date: parseInt(dom.dataset.date),
          inline: true,
          approved: true
        };
      }
    }
  ],
  toDOM(node) {
    return [
      "span",
      {
        class: node.attrs.approved
          ? "approved-insertion"
          : `insertion user-${node.attrs.user}`,
        "data-user": node.attrs.user,
        "data-username": node.attrs.username,
        "data-date": node.attrs.date
      }
    ];
  }
};

export default insertion;
