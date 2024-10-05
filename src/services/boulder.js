import { request } from "./common/apiRequest";

export const getBoulderList = async (pathParams, queryParams) => {
  const { spraywallId } = pathParams;
  const {
    searchQuery,
    minGradeIndex,
    maxGradeIndex,
    sortBy,
    activity,
    status,
    circuits,
    page,
  } = queryParams;
  return await request(
    "get",
    `boulder/list/${spraywallId}?search=${searchQuery}&grade_min=${minGradeIndex}&grade_max=${maxGradeIndex}&sort=${sortBy}&activity=${activity}&status=${status}&circuits=${circuits}&page=${page}`
  );
};

export const getBoulderDetail = async (pathParams) => {
  const { boulderId } = pathParams;
  return await request("get", `boulder/detail/${boulderId}`);
};

export const compositeBoulder = async (data) => {
  return await request("post", "boulder/composite/", data);
};

export const addBoulderToSpraywall = async (pathParams, data) => {
  const { spraywallId } = pathParams;
  return await request("post", `boulder/list/${spraywallId}`, data);
};

export const addBoulderToCircuit = async (pathParams) => {
  const { circuitId, boulderId } = pathParams;
  return await request(
    "post",
    `boulder/boulder_in_circuit/${circuitId}/${boulderId}`
  );
};

export const updateBoulderAPI = async (pathParams, data) => {
  const { boulderId } = pathParams;
  return await request("patch", `boulder/detail/${boulderId}`, data);
};

export const deleteBoulderAPI = async (pathParams) => {
  const { boulderId } = pathParams;
  return await request("delete", `boulder/detail/${boulderId}`);
};

export const deleteBoulderFromCircuit = async (pathParams) => {
  const { circuitId, boulderId } = pathParams;
  return await request(
    "delete",
    `boulder/boulder_in_circuit/${circuitId}/${boulderId}`
  );
};
