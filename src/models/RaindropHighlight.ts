import { HighlightsColor } from "./enums";

export type Highlight = {
    note: string;
    color: HighlightsColor;
    text: string;
    created: Date;
    id: string;
  };