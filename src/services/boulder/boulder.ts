import { request } from "../common/apiRequest";
import { Path, Queries } from "./types";
import { BoulderCompositeData } from "./types/composite";
import { BoulderDetailParams } from "./types/detail";
import { BoulderListParams } from "./types/list";

export const getBoulderList = async (path: Path, queries: Queries) => {
  return await request(
    "get",
    `boulder/list/${path.spraywallId}?search=${queries.searchQuery}&grade_min=${queries.minGradeIndex}&grade_max=${queries.maxGradeIndex}&sort=${queries.sortBy}&activity=${queries.activity}&status=${queries.status}&circuit=${queries.circuit}&exclude_ids=${queries.excludeIds}&page=${queries.page}`
  );
};

export const getBoulderDetail = async ({ path }: { path: Path }) => {
  return await request("get", `boulder/detail/${path.boulderId}`);
};

export const compositeBoulder = async (data: BoulderCompositeData) => {
  return await request(
    "post",
    "boulder/composite/",
    data,
    "multipart/form-data"
  );
};

export const addBoulderToSpraywall = async ({ pathParams, data }) => {
  const { spraywallId } = pathParams;
  return await request("post", `boulder/list/${spraywallId}`, data);
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
