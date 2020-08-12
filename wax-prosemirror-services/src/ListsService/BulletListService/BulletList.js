import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import { wrapInList } from 'prosemirror-schema-list';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class BulletList extends Tools {
  title = 'Wrap in bullet list';
  content = icons.bullet_list;
  name = 'BulletList';

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

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.bulletlist)(state);
    };
  }
}
