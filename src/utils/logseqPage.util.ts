import { RaindropItem } from "../models/RaindropItem";
import "@logseq/libs";
import { settings } from "./settings.util";
import { getSingleRaindrop } from "../api/raindrop.api";
import {
  mapRaindropDataToProperties,
  PROP_RAINDROP_ID,
} from "./logseqPageProperties.util";
import {
  createPagePropertiesBlock,
  updateBlockState,
} from "./logseqBlock.util";
import { BlockEntity, PageEntity } from "@logseq/libs/dist/LSPlugin.user";
import { LogseqPageEntity } from "../models/LogseqPageEntity";

export const generateLogseqPage = async (item: RaindropItem): Promise<void> => {
  const singleItem: RaindropItem | undefined = await getSingleRaindrop(item.id);

  if (singleItem) {
    const prefix = settings.pagePrefix();
    await createOrLoadLogseqPage(singleItem, prefix);
  } else {
    logseq.UI.showMsg("Error while loading content from raindrop API", "warn");
  }
};

const createOrLoadLogseqPage = async (
  item: RaindropItem,
  prefix: string
): Promise<void> => {
  const existingPage: LogseqPageEntity | null = await getPageByRaindropId(
    item.id
  );
  const pageProperties = mapRaindropDataToProperties(item);

  if (existingPage) {
    logseq.UI.showMsg("Page already imported", "error");
    logseq.App.pushState("page", { name: existingPage.name });
  } else {
    await logseq.Editor.createPage(
      `${prefix ? prefix + "/" : ""}${item.title}`
    );
  }

  const firstBlockOnPage: BlockEntity = (
    await logseq.Editor.getCurrentPageBlocksTree()
  )[0];

  createPagePropertiesBlock(firstBlockOnPage, pageProperties);
  updateBlockState(firstBlockOnPage);
};

const getPageByRaindropId = async (
  id: string
): Promise<LogseqPageEntity | null> => {
  const pages: LogseqPageEntity[] | null = await logseq.DB.q(
    `(page-property ${PROP_RAINDROP_ID} ${id})`
  );

  if (!pages) {
    return null;
  }

  switch (pages.length) {
    case 0:
      return null;
    case 1:
      return pages[0];
    default:
      const sortedPagesByUpdatedAt: LogseqPageEntity[] = pages.sort(
        (a: LogseqPageEntity, b: LogseqPageEntity) => a.createdAt - b.createdAt
      );

      return sortedPagesByUpdatedAt[0];
  }
};
