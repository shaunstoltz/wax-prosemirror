import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import { v4 as uuidv4 } from 'uuid';
import ToolBarBtn from '../components/ToolBarBtn';
import helpers from '../helpers/helpers';
import Tools from '../../lib/Tools';

@injectable()
class MultipleChoiceSingleCorrectQuestion extends Tools {
  title = 'Add Multiple Choice Single Correct Question';
  icon = 'multipleChoice';
  name = 'Multiple Choice Single Correct';
  label = 'Multiple Choice Single Correct';

  get run() {
    return (view, context) => {
      helpers.createOptions(
        view,
        context,
        view.state.config.schema.nodes.multiple_choice_single_correct_container,
        view.state.config.schema.nodes.question_node_multiple_single,
        view.state.config.schema.nodes.multiple_choice_single_correct,
      );
    };
  }

  get active() {
    return state => {
      if (
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.multiple_choice_single_correct,
        ) ||
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.question_node_multiple_single,
        )
      ) {
        return true;
      }
      return false;
    };
  }

  select = (state, activeView) => {
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('MultipleChoice')) return false;
    let status = true;
    const { from, to } = state.selection;

    if (from === null) return false;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.groups.includes('questions')) {
        status = false;
      }
    });
    return status;
  };

  get enable() {
    return state => {};
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <ToolBarBtn item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

export default MultipleChoiceSingleCorrectQuestion;
