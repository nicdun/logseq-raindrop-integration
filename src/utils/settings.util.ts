import "@logseq/libs";
import type { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

const config: SettingSchemaDesc[] = [
  {
    default: "",
    description:
      "Your API access token to get access to your raindrop space. You can find a documentation here: https://app.raindrop.io/settings/integrations.",
    key: "accessToken",
    title: "Raindrop access token",
    type: "string",
  },
  {
    default: "",
    description:
      "String used as a prefix for created pages due to raindrop bookmarks. Creates a hierarchy in logseq if needed. Default is <empty>.",
    key: "pagePrefix",
    title: "Page Hierarchy Prefix",
    type: "string",
  },
  {
    default: "{text}",
    description:
      "Markdown formatting to use for highlights. Available variables: `{text}` (contents of the highlight), `{color}` (color of the highlight), ",
    key: "templateHighlight",
    title: "Highlight template",
    type: "string",
  },
  {
    default:
      '{ "tags": "tags", "source": "url", "created": "created", "type": "type"}',
    description:
      'Setup your individual page property names based on raindrop attributes. Plugin adds raindrop-id per default to identify generated pages. Format string as JSON like (`{ "tags": "tags", "source": "url", "created": "created", "type": "type"}`). Available variables: `url`, `tags`, `created`, `description`, `type`',
    key: "pageProperties",
    title: "Page properties",
    type: "string",
  },
];

/**
 * Settings object returns current settings.
 */
export const settings = {
  accessToken: (): string => logseq.settings!["accessToken"],
  highlight: (): string => logseq.settings!["templateHighlight"],
  pagePrefix: (): string => logseq.settings!["pagePrefix"],
  pageProperties: (): string => logseq.settings!["pageProperties"],
};

/**
 * Registers the settings.
 * Logseq creates plugin page.
 */
export const registerSettings = (): void => {
  logseq.useSettingsSchema(config);
};
