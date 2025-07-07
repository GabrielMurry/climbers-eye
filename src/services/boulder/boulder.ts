import { request } from "../common/apiRequest";
import { Data, Path, Queries } from "./types";
import { BASE_URL } from "@env";

function trimAddress(address: string): string {
  return address.replace(BASE_URL + "/", "");
}

export const getBoulderList = async (path: Path, queries: Queries) => {
  return await request(
    "get",
    `boulder/list/${path.spraywallId}?search=${queries.searchQuery}&grade_min=${queries.minGradeIndex}&grade_max=${queries.maxGradeIndex}&ordering=${queries.ordering}&activity=${queries.activity}&status=${queries.status}&circuit=${queries.circuit}`
  );
};

export const getNextPageBoulderList = async (next: string) => {
  const endpoint = trimAddress(next);
  return await request("get", endpoint);
};

export const getLikedBoulders = async (path: Path) => {
  return await request("get", `like/list/${path.spraywallId}`);
};

export const getNextPageLikedBoulders = async (next: string) => {
  const endpoint = trimAddress(next);
  return await request("get", endpoint);
};

export const getLogbookBoulders = async (path: Path) => {
  return await request("get", `send/logbook_list/${path.spraywallId}`);
};

export const getNextPageLogbookBoulders = async (next: string) => {
  const endpoint = trimAddress(next);
  return await request("get", endpoint);
};

export const getBoulderDetail = async (path: Path) => {
  return await request("get", `boulder/detail/${path.boulderId}`);
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
