import { request } from "./common/apiRequest";

export const getSpraywallList = async (pathParams) => {
  const { gymId } = pathParams;
  return await request("get", `spraywall/list/${gymId}`);
};

export const createSpraywall = async (pathParams, data) => {
  const { gymId } = pathParams;
  return await request("post", `spraywall/list/${gymId}`, data);
};

export const updateSpraywallAPI = async (pathParams, data) => {
  const { spraywallId } = pathParams;
  return await request("patch", `spraywall/detail/${spraywallId}`, data);
};

export const deleteSpraywallAPI = async (pathParams) => {
  const { spraywallId } = pathParams;
  return await request("delete", `spraywall/detail/${spraywallId}`);
};
