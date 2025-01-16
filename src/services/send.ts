import { Path } from "./boulder/types";
import { request } from "./common/apiRequest";

type SendData = {
  attempts: string;
  suggestedGrade: string;
  quality: number;
  notes: string;
  person: number;
  boulder: number;
};

export const addSendToBoulder = async (path: Path, data: SendData) => {
  return await request("post", `send/list/${path.boulderId}`, data);
};

export const deleteSendFromBoulder = async (path: Path) => {
  return await request("delete", `send/detail/${path.sendId}`);
};
