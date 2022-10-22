import type { BlockEntity } from "@logseq/libs/dist/LSPlugin";

export const createPagePropertiesBlock = async (
  block: BlockEntity,
  properties: Record<string, string>
): Promise<void> => {
  Object.entries(properties).map(async ([key, value]) => {
    await logseq.Editor.upsertBlockProperty(block.uuid, key, value);
  });
};

export const updateBlockState = async (block: BlockEntity): Promise<void> => {
  const properties = await logseq.Editor.getBlockProperties(block.uuid);
  const content = (await logseq.Editor.getBlock(block.uuid))!.content;

  await logseq.Editor.updateBlock(block.uuid, "Updating props...", {
    properties: properties,
  });

  await logseq.Editor.updateBlock(block.uuid, content, {
    properties: properties,
  });
};
