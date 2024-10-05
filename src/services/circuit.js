import { request } from "./common/apiRequest";

export const getCircuitList = async (pathParams) => {
  const { spraywallId } = pathParams;
  return await request("get", `circuit/list/${spraywallId}`);
};

export const createCircuit = async (pathParams, data) => {
  const { spraywallId } = pathParams;
  return await request("post", `circuit/list/${spraywallId}`, data);
};

export const deleteCircuit = async (pathParams) => {
  const { circuitId } = pathParams;
  return await request("delete", `circuit/detail/${circuitId}`);
};
