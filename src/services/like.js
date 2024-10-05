import { request } from "./common/apiRequest";

export const addLikeToBoulder = async (pathParams, data) => {
  const { boulderId, userId } = pathParams;
  return await request("post", `like/${boulderId}/${userId}`, data);
};

export const deleteLikeFromBoulder = async (pathParams, data) => {
  const { boulderId, userId } = pathParams;
  return await request("delete", `like/${boulderId}/${userId}`, data);
};
