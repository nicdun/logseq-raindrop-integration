import React, { FC, useEffect, useState } from "react";
import { searchRaindrop } from "../../api/raindrop.api";
import { RaindropItem } from "../../models/RaindropItem";
import { generateLogseqPage } from "../../utils/logseqPage.util";

interface RaindropDashboardProps {}

const RaindropDashboard: FC<RaindropDashboardProps> = () => {
  const [searchResults, setSearchResults] = useState<RaindropItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const executeRaindropSearch = async (value: string): Promise<void> => {
    setLoading(true);
    const items: RaindropItem[] = await searchRaindrop(value);
    setSearchResults(items);
    setLoading(false);
  };

  useEffect(() => {
    executeRaindropSearch("");
  }, []);

  return (
    <div>
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
      <span className="block mb-2 text-m font-bold text-gray-500">
        Search results
      </span>
      <div className="flex flex-col overflow-hidden justify-center h-[700px]">
        {loading ? (
          <div className="text-center">
            <div role="status">
              <svg
                className="inline mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto">
            {searchResults.map((item: RaindropItem) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-flex-start border border-white rounded-lg p-2.5 hover:border-gray-300"
                  onClick={(e) => generateLogseqPage(item)}
                >
                  <div className="flex flex-row">
                    {item.cover ? (
                      <img
                        className="object-cover rounded-lg md:h-auto max-h-[100px] w-[50%]"
                        src={item.cover.toString()}
                        alt=""
                      />
                    ) : null}
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

                  <div className="flex flex-col justify-between pt-2.5 leading-normal">
                    <h6 className="mb-2 text-base font-bold tracking-tight text-gray-900">
                      {item.title}
                    </h6>
                    <p className="font-normal text-sm tracking-tight text-gray-700">
                      {item.description}
                    </p>
                    <div>
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-emerald-700 text-sm tracking-tight"
                        >
                          #{tag}{" "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default RaindropDashboard;
