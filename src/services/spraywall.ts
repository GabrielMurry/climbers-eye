import { request } from "./common/apiRequest";
import { Path } from "./boulder/types";
import { ImageObjUrl } from "../utils/types/image";

export const getSpraywallList = async ({ pathParams }) => {
  const { gymId } = pathParams;
  return await request("get", `spraywall/list/${gymId}`);
};

export const createSpraywall = async (path: Path, data: FormData) => {
  return await request("post", `spraywall/list/${path.gymId}`, data);
};

export const updateSpraywallAPI = async (
  path: Path,
  data: ImageObjUrl | object
) => {
  return await request("patch", `spraywall/detail/${path.spraywallId}`, data);
};

export const deleteSpraywallAPI = async (path: Path) => {
  return await request("delete", `spraywall/detail/${path.spraywallId}`);
};
