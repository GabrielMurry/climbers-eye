import { request } from "../common/apiRequest";
import { Data, Path, Queries } from "./types";

export const getBoulderList = async (path: Path, queries: Queries) => {
  return await request(
    "get",
    `boulder/list/${path.spraywallId}?search=${queries.searchQuery}&grade_min=${queries.minGradeIndex}&grade_max=${queries.maxGradeIndex}&sort=${queries.sortBy}&activity=${queries.activity}&status=${queries.status}&circuit=${queries.circuit}&exclude_ids=${queries.excludeIds}&page=${queries.page}`
  );
};

export const getBoulderDetail = async (path: Path) => {
  return await request("get", `boulder/detail/${path.boulderId}`);
};

export const compositeBoulder = async (data: FormData) => {
  return await request("post", "boulder/composite/", data);
};

export const addBoulderToSpraywall = async (path: Path, data: Data) => {
  return await request("post", `boulder/list/${path.spraywallId}`, data);
};

export const addBoulderToCircuitAPI = async ({ pathParams }) => {
  const { circuitId, boulderId } = pathParams;
  return await request(
    "post",
    `boulder/boulder_in_circuit/${circuitId}/${boulderId}`
  );
};

export const updateBoulderAPI = async ({ pathParams, data }) => {
  const { boulderId } = pathParams;
  return await request("patch", `boulder/detail/${boulderId}`, data);
};

export const deleteBoulderAPI = async ({ pathParams }) => {
  const { boulderId } = pathParams;
  return await request("delete", `boulder/detail/${boulderId}`);
};

export const removeBoulderFromCircuitAPI = async ({ pathParams }) => {
  const { circuitId, boulderId } = pathParams;
  return await request(
    "delete",
    `boulder/boulder_in_circuit/${circuitId}/${boulderId}`
  );
};
