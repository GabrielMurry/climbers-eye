import { request } from "./common/apiRequest";

export const addBookmarkToBoulder = async ({ pathParams, data }) => {
  const { boulderId, userId } = pathParams;
  return await request("post", `bookmark/${boulderId}/${userId}`, data);
};

export const deleteBookmarkFromBoulder = async ({ pathParams, data }) => {
  const { boulderId, userId } = pathParams;
  return await request("delete", `bookmark/${boulderId}/${userId}`, data);
};
