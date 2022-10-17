import { HighlightsColor, RaindropType } from "./enums";
import { Highlight } from "./RaindropHighlight";

export type RaindropResponse = {
    excerpt: string;
    note: string;
    type: RaindropType;
    cover: string | URL;
    tags: string[];
    removed: boolean;
    _id: number;
    link: string;
    title: string;
    created: string;
    lastUpdate: string;
    media: [
      {
        link: string;
      }
    ];
    user: {
      $ref: "users";
      $id: number;
    };
    collection: {
      $ref: "collections";
      $id: number;
    };
    highlights: Highlight[];
    domain: string;
    creatorRef: {
      avatar: string;
      _id: number;
      name: string;
      email: string;
    };
    sort: number;
    cache: {
      status:
        | "ready"
        | "retry"
        | "failed"
        | "invalid-origin"
        | "invalid-timeout"
        | "invalid-size";
      size: number;
      created: string;
    };
    collectionId: number;
  };