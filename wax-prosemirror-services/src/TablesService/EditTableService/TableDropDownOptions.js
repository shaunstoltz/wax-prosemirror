import React from "react";
import { v4 as uuid } from "uuid";
import { injectable } from "inversify";
import { isEmpty } from "lodash";
import { TableDropDown } from "wax-prosemirror-components";
import { addColumnBefore } from "prosemirror-tables";
import { Commands } from "wax-prosemirror-utilities";
import Tools from "../../lib/Tools";

@injectable()
export default class TableDropDownOptions extends Tools {
  title = "Select Options";
  content = "table";

  get run() {
    return () => {
      return true;
    };
  }

  get enable() {
    return state => {
      return Commands.canInsert(state.config.schema.nodes.table)(state);
    };
  }

  select(state) {
    return addColumnBefore(state);
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? (
      <TableDropDown key={uuid()} item={this.toJSON()} view={view} />
    ) : null;
  }
}
