import { Path } from "./boulder/types";
import { request } from "./common/apiRequest";

type BookmarkData = {
  boulder: number;
  person: number;
};

export const addBookmarkToBoulder = async (path: Path, data: BookmarkData) => {
  return await request("post", `bookmark/${path.boulderId}`, data);
};

export const deleteBookmarkFromBoulder = async (
  path: Path,
  data: BookmarkData
) => {
  return await request("delete", `bookmark/${path.boulderId}`, data);
};
