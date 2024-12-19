import { Path } from "./boulder/types";
import { request } from "./common/apiRequest";

type ProfilePic = {
  profilePicUrl: string | null;
  profilePicWidth: number | null;
  profilePicHeight: number | null;
};

export const getLogbookList = async (path: Path, page: number) => {
  return await request(
    "get",
    `profile/logbook_list/${path.spraywallId}?page=${page}`
  );
};

export const getLikeList = async (path: Path, page: number) => {
  return await request(
    "get",
    `profile/like_list/${path.spraywallId}?page=${page}`
  );
};

export const getBookmarkList = async (path: Path, page: number) => {
  return await request(
    "get",
    `profile/bookmark_list/${path.spraywallId}?page=${page}`
  );
};

export const getCreationList = async (path: Path, page: number) => {
  return await request(
    "get",
    `profile/creation_list/${path.spraywallId}?page=${page}`
  );
};

export const updateProfileInfo = async (data: ProfilePic | FormData) => {
  return await request("patch", `profile/detail/`, data);
};
