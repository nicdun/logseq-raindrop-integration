import { Highlight } from "./RaindropHighlight";

export type RaindropItem = {
    title: string;
    description: string;
    highlights: Highlight[];
    tags: string[];
    created: Date;
    url: URL;
    collectionName?: string;
    id: string;
  };