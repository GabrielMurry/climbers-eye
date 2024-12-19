import { Path } from "./boulder/types";
import { request } from "./common/apiRequest";

type LikeData = {
  boulder: number;
  person: number;
};

export const addLikeToBoulder = async (path: Path, data: LikeData) => {
  return await request("post", `like/${path.boulderId}`, data);
};

export const deleteLikeFromBoulder = async (path: Path, data: LikeData) => {
  const { boulderId, userId } = pathParams;
  return await request("delete", `like/${boulderId}/${userId}`, data);
};
