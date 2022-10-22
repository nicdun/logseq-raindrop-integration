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
    openRaindropIntegrationUi() {
      logseq.showMainUI();
    },
  });

  logseq.setMainUIInlineStyle({
    position: "fixed",
    zIndex: 11,
  });

  const toolbarButtonKey = "raindrop-integration";

  logseq.provideStyle(`
    div[data-injected-ui=${toolbarButtonKey}-${key}] {
    display: flex;
    align-items: center;
    font-weight: 500;
    position: relative;
    top: 0px;
    opacity: 0.7;
    }
  `);

  logseq.App.registerUIItem("toolbar", {
    key: toolbarButtonKey,
    template: `
    <a data-on-click="openRaindropIntegrationUi" class="button" style="font-size: 20px">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height="16"
    viewBox="0 0 48 48"
    data-size="regular"
  >
    <defs></defs>
    <defs>
      <path
        id="a"
        d="M12 0a12 12 0 0112 12v12H12a12 12 0 110-24z"
      ></path>
      <path id="c" d="M0 24V11.7A12 12 0 1112 24H0z"></path>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <path
        fill="#1988E0"
        d="M35.3 9.7a16 16 0 01-.6 23.2L24 43 13.3 33l-.6-.7A16 16 0 1135.3 9.7z"
      ></path>
      <g transform="translate(0 19)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a"></use>
        </mask>
        <use fill="#2CD4ED" xlinkHref="#a"></use>
        <path
          fill="#0DB4E2"
          d="M35.3-9.3a16 16 0 01-.6 23.2L24 24 13.3 14l-.6-.7A16 16 0 1135.3-9.3z"
          mask="url(#b)"
        ></path>
      </g>
      <g transform="translate(24 19)">
        <mask id="d" fill="#fff">
          <use xlinkHref="#c"></use>
        </mask>
        <use fill="#3169FF" xlinkHref="#c"></use>
        <path
          fill="#3153FF"
          d="M11.3-9.3a16 16 0 01-.6 23.2L0 24l-10.7-10-.6-.7A16 16 0 1111.3-9.3z"
          mask="url(#d)"
        ></path>
      </g>
    </g>
  </svg>
    </a>
  `,
  });
}

logseq.ready().then(main).catch(console.error);
