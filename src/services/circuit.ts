import { Path } from "./boulder/types";
import { request } from "./common/apiRequest";

type CircuitData = {
  name: string;
  description: string;
  color: string;
  private: boolean;
  person: number;
  spraywall: number;
};

export const getCircuitList = async ({ pathParams }) => {
  const { spraywallId } = pathParams;
  return await request("get", `circuit/list/${spraywallId}`);
};

export const createCircuit = async (path: Path, data: CircuitData) => {
  return await request("post", `circuit/list/${path.spraywallId}`, data);
};

export const deleteCircuitAPI = async ({ pathParams }) => {
  const { circuitId } = pathParams;
  return await request("delete", `circuit/detail/${circuitId}`);
};
