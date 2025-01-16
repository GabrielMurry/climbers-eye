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

export const getCircuitList = async (path: Path) => {
  return await request("get", `circuit/list/${path.spraywallId}`);
};

export const createCircuit = async (path: Path, data: CircuitData) => {
  return await request("post", `circuit/list/${path.spraywallId}`, data);
};

export const deleteCircuitAPI = async (path: Path) => {
  return await request("delete", `circuit/detail/${path.circuitId}`);
};
