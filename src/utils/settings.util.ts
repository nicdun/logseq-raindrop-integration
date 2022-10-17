import "@logseq/libs";
import type { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

const config: SettingSchemaDesc[] = [
  {
    default: "",
    description:
      "Your API access token to get access to your raindrop space. You can find a documentation here: https://app.raindrop.io/settings/integrations.",
    key: "access_token",
    title: "Raindrop access token",
    type: "string",
  },
  {
    default: "",
    description:
      "String used as a prefix for created pages due to raindrop bookmarks. Creates a hierarchy in logseq if needed. Default is <empty>.",
    key: "page_prefix",
    title: "Page Hierarchy Prefix",
    type: "string",
  },
  {
    default: "{text}",
    description:
      "Markdown formatting to use for highlights. Available variables: `{text}` (contents of the highlight), `{color}` (color of the highlight), ",
    key: "template_highlight",
    title: "Highlight template",
    type: "string",
  },
  // {
  //   default: "",
  //   description:
  //     "Additional page properties",
  //   key: "template_deleted",
  //   title: "Deleted content template",
  //   type: "string",
  // },
];

/**
 * Settings object returns current settings.
 */
export const settings = {
  access_token: (): string => logseq.settings!["access_token"],
  highlight: (): string => logseq.settings!["template_highlight"],
  prefix: (): string => logseq.settings!["page_prefix"],
};

/**
 * Registers the settings.
 * Logseq creates plugin page.
 */
export const registerSettings = (): void => {
  logseq.useSettingsSchema(config);
};
