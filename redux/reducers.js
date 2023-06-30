import { boulderGrades } from "../utils/constants/boulderConstants";
import {
  SET_USER_NAME,
  SET_USER_ID,
  SET_GYM_NAME,
  SET_SPRAYWALL_NAME,
  SET_SPRAYWALL_ID,
  SET_DEFAULT_IMAGE_URI,
  SET_DEFAULT_IMAGE_WIDTH,
  SET_DEFAULT_IMAGE_HEIGHT,
  SET_HEADSHOT_IMAGE_URI,
  SET_HEADSHOT_IMAGE_WIDTH,
  SET_HEADSHOT_IMAGE_HEIGHT,
  SET_BANNER_IMAGE_URI,
  SET_BANNER_IMAGE_WIDTH,
  SET_BANNER_IMAGE_HEIGHT,
  SET_FILTER_SORT_BY,
  SET_FILTER_MIN_GRADE_INDEX,
  SET_FILTER_MAX_GRADE_INDEX,
  SET_FILTER_CLIMB_TYPE,
  SET_FILTER_STATUS,
  SET_FILTER_CIRCUITS,
  REMOVE_FILTER_CIRCUITS,
  RESET_FILTER_CIRCUITS,
} from "./actions";

const initialState = {
  username: "",
  userID: "",
  gymName: "",
  spraywallName: "",
  spraywallID: "",
  defaultImageUri: null,
  defaultImageWidth: "",
  defaultImageHeight: "",
  headshotImageUri: null,
  headshotImageWidth: "",
  headshotImageHeight: "",
  bannerImageUri: null,
  bannerImageWidth: "",
  bannerImageHeight: "",
  filterSortBy: "popular",
  filterMinGradeIndex: 0,
  filterMaxGradeIndex: boulderGrades.length - 1,
  filterClimbType: "boulder",
  filterStatus: "all",
  filterCircuits: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, username: action.payload };
    case SET_USER_ID:
      return { ...state, userID: action.payload };
    case SET_HEADSHOT_IMAGE_URI:
      return { ...state, headshotImageUri: action.payload };
    case SET_HEADSHOT_IMAGE_WIDTH:
      return { ...state, headshotImageWidth: action.payload };
    case SET_HEADSHOT_IMAGE_HEIGHT:
      return { ...state, headshotImageHeight: action.payload };
    case SET_BANNER_IMAGE_URI:
      return { ...state, bannerImageUri: action.payload };
    case SET_BANNER_IMAGE_WIDTH:
      return { ...state, bannerImageWidth: action.payload };
    case SET_BANNER_IMAGE_HEIGHT:
      return { ...state, bannerImageHeight: action.payload };
    default:
      return state;
  }
}

export function gymReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GYM_NAME:
      return { ...state, gymName: action.payload };
    default:
      return state;
  }
}

export function spraywallReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPRAYWALL_NAME:
      return { ...state, spraywallName: action.payload };
    case SET_SPRAYWALL_ID:
      return { ...state, spraywallID: action.payload };
    case SET_DEFAULT_IMAGE_URI:
      return { ...state, defaultImageUri: action.payload };
    case SET_DEFAULT_IMAGE_WIDTH:
      return { ...state, defaultImageWidth: action.payload };
    case SET_DEFAULT_IMAGE_HEIGHT:
      return { ...state, defaultImageHeight: action.payload };
    case SET_FILTER_SORT_BY:
      return { ...state, filterSortBy: action.payload };
    case SET_FILTER_MIN_GRADE_INDEX:
      return { ...state, filterMinGradeIndex: action.payload };
    case SET_FILTER_MAX_GRADE_INDEX:
      return { ...state, filterMaxGradeIndex: action.payload };
    case SET_FILTER_CLIMB_TYPE:
      return { ...state, filterClimbType: action.payload };
    case SET_FILTER_STATUS:
      return { ...state, filterStatus: action.payload };
    case SET_FILTER_CIRCUITS:
      return {
        ...state,
        filterCircuits: [...state.filterCircuits, action.payload],
      };
    case REMOVE_FILTER_CIRCUITS:
      const updatedCircuits = state.filterCircuits.filter(
        (circuit) => circuit.id !== action.payload.id
      );
      return { ...state, filterCircuits: updatedCircuits };
    case RESET_FILTER_CIRCUITS:
      return { ...state, filterCircuits: [] };
    default:
      return state;
  }
}
