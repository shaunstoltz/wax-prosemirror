const markInsertion = (
  tr,
  from,
  to,
  user,
  username,
  date1,
  date10,
  approved
) => {
  tr.removeMark(from, to, tr.doc.type.schema.marks.deletion);
  tr.removeMark(from, to, tr.doc.type.schema.marks.insertion);
  const insertionMark = tr.doc.type.schema.marks.insertion.create({
    user,
    username,
    date: date10,
    approved
  });
  tr.addMark(from, to, insertionMark);
  // Add insertion mark also to block nodes (figures, text blocks) but not table cells/rows and lists.
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (
      pos < from ||
      ["bullet_list", "ordered_list"].includes(node.type.name)
    ) {
      return true;
    } else if (
      node.isInline ||
      ["table_row", "table_cell"].includes(node.type.name)
    ) {
      return false;
    }
    if (node.attrs.track) {
      const track = [];
      if (!approved) {
        track.push({ type: "insertion", user, username, date: date1 });
      }
      tr.setNodeMarkup(
        pos,
        null,
        Object.assign({}, node.attrs, { track }),
        node.marks
      );
    }
    if (node.type.name === "table") {
      return false;
    }
  });
};

export default markInsertion;