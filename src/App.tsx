import React, { useRef } from "react";
import logo from "./assets/raindrop.png";
import { settings } from "./utils/settings.util";
import { useAppVisible } from "./hooks/useAppVisible";
import RaindropDashboard from "./components/RaindropDashboard/RaindropDashboard";
import SetupIncompleteDashboard from "./components/SetupIncompleteDashboard/SetupIncompleteDashboard";

export function App() {
  const innerRef = useRef<HTMLDivElement>(null);
  const isVisible = useAppVisible();

  const setupComplete = (): boolean => {
    return (
      settings.accessToken() !== undefined && settings.accessToken() !== ""
    );
  };

  if (isVisible) {
    return (
      <main
        className="relative h-full"
        onClick={(e) => {
          if (!innerRef.current?.contains(e.target as any)) {
            window.logseq.hideMainUI();
          }
        }}
      >
        <div
          ref={innerRef}
          className="absolute flex flex-col items-stretch top-12 right-4 p-2 w-full max-w-[420px] bg-white rounded-lg border shadow-md sm:p-4"
        >
          <div>
            <div className="flex flex-row justify-start items-center pb-4">
              <img className="w-[40px] pr-2" src={logo} alt="Raindrop logo" />
              <h3 className="font-bold">Raindrop Integration</h3>
            </div>
            {setupComplete() ? (
              <RaindropDashboard />
            ) : (
              <SetupIncompleteDashboard />
            )}
          </div>
        </div>
      </main>
    );
  }

  return null;
}

export default App;
