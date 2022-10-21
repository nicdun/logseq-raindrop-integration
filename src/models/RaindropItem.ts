import { Highlight } from "./RaindropHighlight";

export type RaindropItem = {
  title: string;
  description: string;
  highlights: Highlight[];
  tags: string[];
  created: Date;
  domain: string;
  cover: string | URL;
  url: URL;
  collectionName?: string;
  id: string;
};
