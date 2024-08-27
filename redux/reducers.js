import { boulderGrades } from "../utils/constants/boulderConstants";
import {
  SET_USER,
  SET_GYM,
  SET_SPRAYWALLS,
  SET_SPRAYWALL_INDEX,
  SET_FILTER_SORT_BY,
  SET_FILTER_MIN_GRADE_INDEX,
  SET_FILTER_MAX_GRADE_INDEX,
  SET_FILTER_ACTIVITY,
  SET_FILTER_CLIMB_TYPE,
  SET_FILTER_STATUS,
  SET_FILTER_CIRCUITS,
  REMOVE_FILTER_CIRCUITS,
  RESET_FILTER_CIRCUITS,
  APPEND_BOULDERS,
  RESET_BOULDERS,
  BOULDERS_ERROR,
  UPDATE_BOULDER,
  ADD_NEW_BOULDER,
  DELETE_BOULDER,
} from "./actions";

const initialState = {
  user: {},
  gym: {},
  spraywalls: [],
  spraywallIndex: 0,
  filterSortBy: "grade",
  filterMinGradeIndex: 0,
  filterMaxGradeIndex: boulderGrades.length - 1,
  filterActivity: null,
  filterClimbType: "boulder",
  filterStatus: "all",
  filterCircuits: [],
  boulders: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
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
    default:
      return state;
  }
}

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_SORT_BY:
      return { ...state, filterSortBy: action.payload };
    case SET_FILTER_MIN_GRADE_INDEX:
      return { ...state, filterMinGradeIndex: action.payload };
    case SET_FILTER_MAX_GRADE_INDEX:
      return { ...state, filterMaxGradeIndex: action.payload };
    case SET_FILTER_ACTIVITY:
      return { ...state, filterActivity: action.payload };
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

export function boulderReducer(state = initialState, action) {
  switch (action.type) {
    case APPEND_BOULDERS:
      return {
        ...state,
        boulders: [...state.boulders, ...action.payload],
      };
    case ADD_NEW_BOULDER:
      return {
        ...state,
        boulders: [action.payload, ...state.boulders],
      };
    case RESET_BOULDERS:
      return {
        ...state,
        boulders: [],
      };
    case BOULDERS_ERROR:
      return {
        ...state,
        boulders: [action.payload],
      };
    case UPDATE_BOULDER:
      return {
        ...state,
        boulders: state.boulders.map((boulder) =>
          boulder.id === action.payload.boulderId
            ? { ...boulder, ...action.payload.updates }
            : boulder
        ),
      };
    case DELETE_BOULDER:
      return {
        ...state,
        boulders: state.boulders.filter(
          (boulder) => boulder.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
