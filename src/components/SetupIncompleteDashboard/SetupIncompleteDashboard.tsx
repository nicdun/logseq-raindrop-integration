import { ILSPluginUser } from "@logseq/libs/dist/LSPlugin.user";
import React, { FC } from "react";

interface SetupIncompleteDashboardProps {}

const SetupIncompleteDashboard: FC<SetupIncompleteDashboardProps> = () => {
  const openAccessTokenHelp = (): void => {
    window.open(
      "https://github.com/nicodun/logseq-raindrop-integration#setting-up-initial-config"
    );
  };

  const showSettings = () => {
    const l = window?.logseq ?? ({} as ILSPluginUser);
    l?.showSettingsUI();
    close();
  };

  return (
    <div>
      <p className="warn">
        Set your access token in plugin settings to start syncing raindrop
        bookmarks.
      </p>
      <p>
        <span className="link" onClick={openAccessTokenHelp}>
          How do I setup the raindrop integration plugin?
        </span>
      </p>
      <span
        onClick={showSettings}
        className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
      >
        Open settings
      </span>
    </div>
  );
};

export default SetupIncompleteDashboard;
