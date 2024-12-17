import { Path } from "./boulder/types";
import { request } from "./common/apiRequest";

export const addSendToBoulder = async ({ pathParams, data }) => {
  const { boulderId } = pathParams;
  return await request("post", `send/list/${boulderId}`, data);
};

export const deleteSendFromBoulder = async (path: Path) => {
  return await request("delete", `send/detail/${path.sendId}`);
};
