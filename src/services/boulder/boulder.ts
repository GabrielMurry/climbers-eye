import { request } from "../common/apiRequest";
import { Data, Path, Queries } from "./types";
import { BASE_URL } from "@env";

export const getBoulderList = async (path: Path, queries: Queries) => {
  return await request(
    "get",
    `boulder/list/${path.spraywallId}?search=${queries.searchQuery}&grade_min=${queries.minGradeIndex}&grade_max=${queries.maxGradeIndex}&sort=${queries.sortBy}&activity=${queries.activity}&status=${queries.status}&circuit=${queries.circuit}&exclude_ids=${queries.excludeIds}&page=${queries.page}`
  );
};

export const getNextPageBoulderList = async (nextPage: string) => {
  const trimmedEndpoint = nextPage.replace(BASE_URL, "");
  return await request("get", trimmedEndpoint);
};

export const getBoulderDetail = async (path: Path) => {
  return await request("get", `boulder/detail/${path.boulderId}`);
};

export const compositeBoulder = async (data: FormData) => {
  return await request("post", "boulder/composite/", data);
};

export const addBoulderToSpraywall = async (path: Path, data: FormData) => {
  return await request("post", `boulder/list/${path.spraywallId}`, data);
};

export const addBoulderToCircuitAPI = async (path: Path) => {
  return await request(
    "post",
    `boulder/boulder_in_circuit/${path.circuitId}/${path.boulderId}`
  );
};

export const updateBoulderAPI = async (path: Path, data: Partial<Data>) => {
  return await request("patch", `boulder/detail/${path.boulderId}`, data);
};

export const deleteBoulderAPI = async (path: Path) => {
  return await request("delete", `boulder/detail/${path.boulderId}`);
};

export const removeBoulderFromCircuitAPI = async (path: Path) => {
  return await request(
    "delete",
    `boulder/boulder_in_circuit/${path.circuitId}/${path.boulderId}`
  );
};
