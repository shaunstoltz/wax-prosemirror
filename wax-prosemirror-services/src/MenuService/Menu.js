import React, { useMemo, useContext } from "react";
import { injectable } from "inversify";
import ToolGroup from "../lib/ToolGroup";

import MenuWrapper from "./MenuWrapper";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";

@injectable()
export default class Menu {
  toolGroups = [];
  config = {};
  name = "";
  constructor(config, createTools) {
    this.name = config.name;
    this.config = config;
    this.toolGroups = createTools(this.config.toolGroups);
    this.excludeIncludeTools();
    this.addToolIntoMore();
  }

  excludeIncludeTools() {
    this.toolGroups.forEach(toolGroup => {
      if (toolGroup instanceof ToolGroup) {
        toolGroup.excludeIncludeTools();
      }
    });
  }

  addToolIntoMore() {
    this.toolGroups.forEach(toolGroup => {
      if (toolGroup instanceof ToolGroup) {
        toolGroup.addToolIntoMore();
      }
    });
  }

  render() {
    return () => {
      const { view: { main }, activeView } = useContext(WaxContext);
      const Bar = useMemo(() => (
        <MenuWrapper items={this.toolGroups} view={activeView || {}} />
      ));
      return <>{Bar}</>;
    };
  }
}
