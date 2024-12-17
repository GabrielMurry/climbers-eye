import { Path } from "./boulder/types";
import { request } from "./common/apiRequest";

export const getLogbookList = async (path: Path, page: number) => {
  return await request(
    "get",
    `profile/logbook_list/${path.spraywallId}?page=${page}`
  );
};

export const getLikeList = async ({ pathParams, queryParams }) => {
  const { spraywallId } = pathParams;
  const { page } = queryParams;
  return await request("get", `profile/like_list/${spraywallId}?page=${page}`);
};

export const getBookmarkList = async ({ pathParams, queryParams }) => {
  const { spraywallId } = pathParams;
  const { page } = queryParams;
  return await request(
    "get",
    `profile/bookmark_list/${spraywallId}?page=${page}`
  );
};

export const getCreationList = async ({ pathParams, queryParams }) => {
  const { spraywallId } = pathParams;
  const { page } = queryParams;
  return await request(
    "get",
    `profile/creation_list/${spraywallId}?page=${page}`
  );
};

export const updateProfileInfo = async ({ data }) => {
  return await request("patch", `profile/detail/`, data, "multipart/form-data");
};
