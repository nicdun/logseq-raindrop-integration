import "@logseq/libs";
import React from "react";
import "./index.css";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { registerSettings } from "./utils/settings.util";

function main() {
  const key = logseq.baseInfo.id;
  console.info(`${key}: MAIN`);

  registerSettings();

  const root = ReactDOM.createRoot(document.getElementById("app")!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  logseq.provideModel({
    show() {
      logseq.showMainUI();
    },
  });

  logseq.setMainUIInlineStyle({
    position: "fixed",
    zIndex: 11,
  });

  const toolbarButtonKey = "tags-plugin-open";

  logseq.provideStyle(`
    div[data-injected-ui=${toolbarButtonKey}-${key}] {
      display: flex;
      align-items: center;
      font-weight: 500;
      position: relative;
    }
  `);

  logseq.App.registerUIItem("toolbar", {
    key: toolbarButtonKey,
    template: `
    <a data-on-click="show" class="button" style="font-size: 20px">
      X
    </a>
  `,
  });
}

logseq.ready().then(main).catch(console.error);
