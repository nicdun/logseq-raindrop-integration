import { RaindropItem } from "../models/RaindropItem";
import { RaindropResponse } from "../models/RaindropResponse";
import { mapToRaindropItem } from "../utils/raindrop.util";
import { settings } from "../utils/settings.util";

const RAINDROP_API = "https://api.raindrop.io/rest/v1";

export const getSingleRaindrop = async (
  id: RaindropItem["id"]
): Promise<RaindropItem | undefined> => {
  try {
    return await fetch(`${RAINDROP_API}/raindrop/ + ${id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${settings.access_token()}`,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Request not successful");
        }

        return res;
      })
      .then((res) => res.json())
      .then((parsed) => mapToRaindropItem(parsed["item"]));
  } catch (e) {
    console.error("getSingleRaindrop failed", e);

    return Promise.resolve(undefined);
  }
};

export const searchRaindrop = async (value: string): Promise<RaindropItem[]> => {
  return await fetch(
    `${RAINDROP_API}/raindrops/0?search=${value}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${settings.access_token()}`,
        "Content-Type": "application/json",
      }),
    }
  )
  .then((res) => res.json())
  .then((parsed) => parsed.items.map((item: RaindropResponse) => mapToRaindropItem(item)));
}
