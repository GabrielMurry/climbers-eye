import { boulderGrades } from "../utils/constants/boulderConstants";
import {
  SET_USER,
  SET_GYM,
  SET_SPRAYWALLS,
  SET_SPRAYWALL_INDEX,
  SET_HEADSHOT_IMAGE,
  SET_FILTER_SORT_BY,
  SET_FILTER_MIN_GRADE_INDEX,
  SET_FILTER_MAX_GRADE_INDEX,
  SET_FILTER_CLIMB_TYPE,
  SET_FILTER_STATUS,
  SET_FILTER_CIRCUITS,
  REMOVE_FILTER_CIRCUITS,
  RESET_FILTER_CIRCUITS,
  SET_PROFILE_DATA,
} from "./actions";

const initialState = {
  user: {},
  gym: {},
  spraywalls: [],
  spraywallIndex: 0,
  headshotImage: {},
  filterSortBy: "popular",
  filterMinGradeIndex: 0,
  filterMaxGradeIndex: boulderGrades.length - 1,
  filterClimbType: "boulder",
  filterStatus: "all",
  filterCircuits: [],
  profileData: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_HEADSHOT_IMAGE:
      return { ...state, headshotImage: action.payload };
    case SET_PROFILE_DATA:
      return { ...state, profileData: action.payload };
    default:
      return state;
  }
}

export function gymReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GYM:
      return { ...state, gym: action.payload };
    default:
      return state;
  }
}

export function spraywallReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPRAYWALLS:
      return { ...state, spraywalls: action.payload };
    case SET_SPRAYWALL_INDEX:
      return { ...state, spraywallIndex: action.payload };
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
