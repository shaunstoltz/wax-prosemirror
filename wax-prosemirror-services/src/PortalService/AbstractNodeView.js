import { v4 as uuidv4 } from 'uuid';

export default class AbstractNodeView {
  constructor(
    node,
    view,
    getPos,
    decorations,
    createPortal,
    Component,
    context,
  ) {
    this.dom = document.createElement('div');

    this.dom.id = uuidv4();
    this.dom.classList.add('portal');

    createPortal(this.dom, Component, node, view, getPos, decorations, context);
  }

  update(node) {
    console.log('d;dld;ddld');
    return false;
  }

  destroy() {
    this.dom = undefined;
    this.contentDOM = undefined;
  }
}
