import { RaindropItem } from "../models/RaindropItem";
import { settings } from "./settings.util";

export const PROP_RAINDROP_ID = "raindrop-id";

export const mapRaindropDataToProperties = (
  item: RaindropItem
): Record<string, string> => {
  const defaultProperties = {
    [PROP_RAINDROP_ID]: item.id,
  };

  const pagePropertiesFromSettings: Record<string, string> | null =
    loadCustomPagePropertiesFromSettings();

  const customProperties: Record<string, string> | null = generateCustomProperties(
    item,
    pagePropertiesFromSettings
  );

  console.log(customProperties);

  return {
    ...defaultProperties,
    ...customProperties,
  };
};

const generateCustomProperties = (
  item: RaindropItem,
  pagePropertiesFromSettings: Record<string, string> | null
): Record<string, string> | null => {
  if (!pagePropertiesFromSettings) {
    return null;
  }

  let customProperties = {};

  Object.entries(pagePropertiesFromSettings).forEach(([key, value]) => {
    console.log(key + value);
    if (!item[value as keyof RaindropItem]) {
      return;
    }

    let raindropItemAttributeValue = item[value as keyof RaindropItem];

    if (raindropItemAttributeValue instanceof Date) {
      raindropItemAttributeValue = `[[${raindropItemAttributeValue.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}]]`;
    }

    customProperties = {
      ...customProperties,
      [key]: raindropItemAttributeValue,
    };
  });

  return customProperties;
};

const loadCustomPagePropertiesFromSettings = (): (Record<string, string> | null) => {
  try {
    return JSON.parse(settings.pageProperties());
  } catch (e) {
    logseq.UI.showMsg(
      "Parsing custom page properties failed. Please update your pageProperties settings and provide a valid JSON string.",
      "error"
    );
    return null;
  }
};
