import { RaindropItem } from "../models/RaindropItem";
import { RaindropResponse } from "../models/RaindropResponse";

export const mapToRaindropItem = (item: RaindropResponse): RaindropItem => {
  return {
    id: item._id.toString(),
    title: item.title,
    description: item.excerpt,
    url: item.link,
    domain: item.domain,
    cover: item.cover,
    created: new Date(item.created),
    tags: item.tags,
    highlights: item.highlights,
  };
};
