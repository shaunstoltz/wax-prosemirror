import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";
import { wrapInList } from "prosemirror-schema-list";
import { blockActive } from "../../lib/Utils";

@injectable()
export default class OrderedList extends Tools {
  title = "Wrap in ordered list";
  content = icons.ordered_list;

  get run() {
    return (state, dispatch) => {
      wrapInList(state.config.schema.nodes.orderedlist)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return wrapInList(state.config.schema.nodes.orderedlist)(state);
    };
  }

  get active() {
    return state => {
      return blockActive(state.config.schema.nodes.orderedlist)(state);
    };
  }
}