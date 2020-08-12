import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

@injectable()
class ExtractProse extends Tools {
  title = 'Change to Extract Prose';
  content = 'Extract Prose';
  name = 'ExtractProse';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.extractProse, {
        class: 'extract-prose',
      })(state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.extractProse)(
        state,
      );
    };
  }
}
export default ExtractProse;
