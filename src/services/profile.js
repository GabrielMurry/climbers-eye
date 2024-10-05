import { request } from "./common/apiRequest";

export const getLogbookList = async (pathParams) => {
  const { spraywallId } = pathParams;
  return await request("get", `profile/logbook_list/${spraywallId}`);
};
