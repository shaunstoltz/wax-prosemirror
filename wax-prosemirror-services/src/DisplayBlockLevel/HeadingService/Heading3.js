import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class Heading3 extends Tools {
  title = 'Change to heading level 3';
  content = 'Heading 3';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.heading, { level: 3 })(
        state,
        dispatch,
      );
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.heading, {
        level: 3,
      })(state);
    };
  }
}
