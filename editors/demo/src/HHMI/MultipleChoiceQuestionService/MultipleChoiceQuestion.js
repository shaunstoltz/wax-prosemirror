import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';

let a = true;
@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add Multiple Choice Question';
  label = 'Multiple Choice';
  name = 'Multiple Choice';

  get run() {
    return (state, dispatch) => {
      const { from, to } = state.selection;
      const { tr } = state;

      state.schema.nodes.question_wrapper.spec.atom = false;

      setTimeout(() => {
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'question_wrapper') {
            const { empty, $from, $to } = state.selection;
            let content = Fragment.empty;
            if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
              content = $from.parent.content.cut(
                $from.parentOffset,
                $to.parentOffset,
              );

            const answerOption = state.config.schema.nodes.multiple_choice.create(
              { id: uuidv4() },
              content,
            );
            dispatch(tr.replaceSelectionWith(answerOption));
          } else {
            tr.setBlockType(
              from,
              to,
              state.config.schema.nodes.question_wrapper,
              {
                class: 'question',
              },
            );
            if (!tr.steps.length) return false;
            const { empty, $from, $to } = state.selection;
            let content = Fragment.empty;
            if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
              content = $from.parent.content.cut(
                $from.parentOffset,
                $to.parentOffset,
              );

            const answerOption = state.config.schema.nodes.multiple_choice.create(
              { id: uuidv4() },
              content,
            );
            dispatch(tr.replaceSelectionWith(answerOption));
            // dispatch(state.tr.replaceSelectionWith(footnote));
          }
        });
        state.schema.nodes.question_wrapper.spec.atom = true;
      });
    };
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId) => {
    return true;
  };

  get enable() {
    return state => {};
  }
}

export default MultipleChoiceQuestion;
