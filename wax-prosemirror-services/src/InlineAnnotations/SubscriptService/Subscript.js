import { toggleMark } from 'prosemirror-commands';
import { Commands } from 'wax-prosemirror-utilities';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import Tools from '../../lib/Tools';

export default
@injectable()
class Subscript extends Tools {
  title = 'Toggle subscript';
  content = icons.subscript;
  name = 'Subscript';

  get run() {
    return (state, dispatch) => {
      toggleMark(state.config.schema.marks.subscript)(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.markActive(state.config.schema.marks.subscript)(state);
    };
  }
}
