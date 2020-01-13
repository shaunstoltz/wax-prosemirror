import React, { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { EditoriaLayout } from "wax-prosemirror-layouts";
import { Wax } from "wax-prosemirror-core";

import { config } from "./config";

import text from "./text";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  #root {
    height:100vh;
    width:100vw;
  }
  }
`;

const StyledWax = styled(Wax)`
  .wax-surface-scroll {
    height: ${props => (props.debug ? "50vh" : "100%")};
  }
`;

const renderImage = file => {
  const reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150);
  });
};

const user = {
  userId: "1234",
  username: "demo"
};

const Editoria = () => (
  <Fragment>
    <GlobalStyle />
    <StyledWax
      config={config}
      autoFocus
      placeholder="Type Something..."
      fileUpload={file => renderImage(file)}
      value="<h1> <span style='font-style:italic;'>test</span>hello <code> this is the code</code></p>"
      layout={EditoriaLayout}
      user={user}
    />
    <div id="editors" />
  </Fragment>
);

export default Editoria;
