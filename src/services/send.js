import { request } from "./common/apiRequest";

export const addSendToBoulder = async (pathParams, data) => {
  const { boulderId } = pathParams;
  return await request("post", `send/list/${boulderId}`, data);
};

export const deleteSendFromBoulder = async (pathParams) => {
  const { sendId } = pathParams;
  return await request("delete", `send/detail/${sendId}`);
};
