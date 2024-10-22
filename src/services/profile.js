import { request } from "./common/apiRequest";

export const getLogbookList = async ({ pathParams, queryParams }) => {
  const { spraywallId } = pathParams;
  const { page } = queryParams;
  return await request(
    "get",
    `profile/logbook_list/${spraywallId}?page=${page}`
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
