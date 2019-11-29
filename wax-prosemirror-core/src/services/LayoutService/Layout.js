import { injectable } from "inversify";
import DefaultLayout from "wax-prosemirror-layout";
import LayoutFactory from "./components/LayoutFactory";

@injectable()
export default class Layout {
  components = {};
  layoutComponent = LayoutFactory(DefaultLayout);
  addComponent(renderArea, component) {
    const size = this.components[renderArea].size();
    this.components[renderArea].set(size + 1, component);
    return this;
  }

  render(renderArea) {
    return this.components[renderArea].values();
  }

  createArea(area) {
    this.components[area] = new Map();
  }

  setLayout(component) {
    this.layoutComponent = LayoutFactory(component);
  }
}
