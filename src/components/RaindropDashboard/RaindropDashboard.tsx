import React, { FC, useEffect, useState } from "react";
import { searchRaindrop } from "../../api/raindrop.api";
import { RaindropItem } from "../../models/RaindropItem";

interface RaindropDashboardProps {}

const RaindropDashboard: FC<RaindropDashboardProps> = () => {
  const [searchResults, setSearchResults] = useState<RaindropItem[]>([]);

  const executeRaindropSearch = async (value: string): Promise<void> => {
    const items: RaindropItem[] = await searchRaindrop(value);
    console.log(items);
    setSearchResults(items);
  };

  useEffect(() => {
    executeRaindropSearch("");
  }, []);

  return (
    <div className="overflow-hidden h-full">
      <label
        htmlFor="default-input"
        className="block mb-2 text-m font-bold text-gray-500"
      >
        Search through pages
      </label>
      <input
        type="text"
        id="default-input"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          executeRaindropSearch(event.target.value)
        }
      ></input>

      <div className="overflow-y-auto h-[700px]">
        <span className="block mb-2 text-m font-bold text-gray-500">
          Search results
        </span>
        {searchResults.map((item: RaindropItem) => {
          return (
            <a
              href="#"
              className="flex flex-col items-flex-start border border-white rounded-lg p-2.5 hover:border-gray-300"
            >
              {item.cover ? (
                <div className="flex flex-row">
                  <img
                    className="object-cover rounded-lg md:h-auto max-h-[100px] w-[50%]"
                    src={item.cover.toString()}
                    alt=""
                  />
                  <div className="flex flex-col items-end text-emerald-700 text-sm tracking-tight w-[50%]">
                    <div>{item.domain}</div>
                    <div>
                      {item.created.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col justify-between pt-2.5 leading-normal">
                <h6 className="mb-2 text-base font-bold tracking-tight text-gray-900">
                  {item.title}
                </h6>
                <p className="font-normal text-sm tracking-tight text-gray-700">
                  {item.description}
                </p>
                <div>
                  {item.tags.map((tag) => (
                    <span className="text-emerald-700 text-sm tracking-tight">
                      #{tag}{" "}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default RaindropDashboard;
