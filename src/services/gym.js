import { request } from "./common/apiRequest";

export const getGymList = async () => {
  return await request("get", `gym/list/`);
};

export const createGym = async (data) => {
  return await request("post", `gym/list/`, data);
};

export const userChooseGym = async (data) => {
  return await request("patch", `gym/user_choose_gym/`, data);
};

export const updateGymInfo = async (pathParams, data) => {
  const { gymId } = pathParams;
  return await request("patch", `gym/detail/${gymId}`, data);
};

export const deleteGym = async (pathParams) => {
  const { gymId } = pathParams;
  return await request("delete", `gym/detail/${gymId}`);
};
