import Tools from "../../lib/Tools";
import { injectable } from "inversify";
import { icons } from "wax-prosemirror-components";
import { wrapInList } from "prosemirror-schema-list";
import { blockActive } from "../../lib/Utils";

@injectable()
export default class BulletList extends Tools {
  title = "Wrap in bullet list";
  content = icons.bullet_list;

  get run() {
    return (state, dispatch) => {
      return wrapInList(state.config.schema.nodes.bulletlist)(state, dispatch);
    };
  }

  get enable() {
    return state => {
      return wrapInList(state.config.schema.nodes.bulletlist)(state);
    };
  }

  get active() {
    return state => {
      return blockActive(state.config.schema.nodes.bulletlist)(state);
    };
  }
}
