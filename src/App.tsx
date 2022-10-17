import React, { useRef } from "react";
import logo from "./assets/raindrop.png";
import { settings } from "./utils/settings.util";
import { useAppVisible } from "./hooks/useAppVisible";
import RaindropDashboard from "./components/RaindropDashboard/RaindropDashboard";
import SetupIncompleteDashboard from "./components/SetupIncompleteDashboard/SetupIncompleteDashboard";

// const body = css({
//   position: "relative",
//   height: "100%",
//   backgroundColor: "white",
//   width: "400px",

//   "& ::-webkit-scrollbar": {
//     width: "6px",
//   },
//   "& ::-webkit-scrollbar-corner": {
//     background: "0 0",
//   },
//   "& ::-webkit-scrollbar-thumb": {
//     backgroundColor: "$interactiveBorder",
//   },
// });

// const app = css({
//   position: "absolute",
//   top: "calc(48px + 10px)",
//   right: "10px",
//   boxSizing: "border-box",
//   display: "flex",
//   flexDirection: "column",
//   gap: "$3",
//   borderRadius: "$2",
//   padding: "$4",

//   maxHeight: "calc(100% - (48px + 10px) * 2)",
//   maxWidth: "50%",
//   overflow: "auto",

//   boxShadow:
//     "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
// });

export function App() {
  const innerRef = useRef<HTMLDivElement>(null);
  const isVisible = useAppVisible();

  const setupComplete = (): boolean => {
    return (
      settings.access_token() !== undefined && settings.access_token() !== ""
    );
  };

  console.log("IS VISIBLE" + isVisible);

  if (isVisible) {
    return (
      <div className="absolute top-12 right-4 p-2 w-full max-w-sm max-h-[80%] bg-white rounded-lg border shadow-md sm:p-4">
        <main
          className="h-[10px]"
          onClick={(e) => {
            if (!innerRef.current?.contains(e.target as any)) {
              window.logseq.hideMainUI();
            }
          }}
        ></main>
        <div>
          <div className="flex flex-row justify-start items-center pb-4">
            <img className="w-[40px] pr-2" src={logo} alt="Raindrop logo" />
            <h3 className="font-bold">Raindrop Integration</h3>
          </div>
          {setupComplete() ? <RaindropDashboard/> : <SetupIncompleteDashboard />}
        </div>
      </div>
    );
  }

  return null;
}

export default App;
