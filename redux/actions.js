export const SET_USER = "SET_USER";
export const SET_GYM = "SET_GYM";
export const SET_SPRAYWALLS = "SET_SPRAYWALLS";
export const SET_SPRAYWALL_INDEX = "SET_SPRAYWALL_INDEX";
export const SET_HEADSHOT_IMAGE = "SET_HEADSHOT_IMAGE";
export const SET_FILTER_SORT_BY = "SET_FILTER_SORT_BY";
export const SET_FILTER_MIN_GRADE_INDEX = "SET_FILTER_MIN_GRADE_INDEX";
export const SET_FILTER_MAX_GRADE_INDEX = "SET_FILTER_MAX_GRADE_INDEX";
export const SET_FILTER_ACTIVITY = "SET_FILTER_ACTIVITY";
export const SET_FILTER_CLIMB_TYPE = "SET_FILTER_CLIMB_TYPE";
export const SET_FILTER_STATUS = "SET_FILTER_STATUS";
export const SET_FILTER_CIRCUITS = "SET_FILTER_CIRCUITS";
export const REMOVE_FILTER_CIRCUITS = "REMOVE_FILTER_CIRCUITS"; // don't need?
export const RESET_FILTER_CIRCUITS = "RESET_FILTER_CIRCUITS"; // don't need?
export const SET_PROFILE_DATA = "SET_PROFILE_DATA";

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const setGym = (gym) => (dispatch) => {
  dispatch({
    type: SET_GYM,
    payload: gym,
  });
};

export const setSpraywalls = (spraywalls) => (dispatch) => {
  dispatch({
    type: SET_SPRAYWALLS,
    payload: spraywalls,
  });
};

export const setSpraywallIndex = (spraywallIndex) => (dispatch) => {
  dispatch({
    type: SET_SPRAYWALL_INDEX,
    payload: spraywallIndex,
  });
};

export const setHeadshotImage = (headshotImage) => (dispatch) => {
  dispatch({
    type: SET_HEADSHOT_IMAGE,
    payload: headshotImage,
  });
};

export const setFilterSortBy = (filterSortBy) => (dispatch) => {
  dispatch({
    type: SET_FILTER_SORT_BY,
    payload: filterSortBy,
  });
};

export const setFilterMinGradeIndex = (filterMinGradeIndex) => (dispatch) => {
  dispatch({
    type: SET_FILTER_MIN_GRADE_INDEX,
    payload: filterMinGradeIndex,
  });
};

export const setFilterActivity = (filterActivity) => (dispatch) => {
  dispatch({
    type: SET_FILTER_ACTIVITY,
    payload: filterActivity,
  });
};

export const setFilterMaxGradeIndex = (filterMaxGradeIndex) => (dispatch) => {
  dispatch({
    type: SET_FILTER_MAX_GRADE_INDEX,
    payload: filterMaxGradeIndex,
  });
};

export const setFilterClimbType = (filterClimbType) => (dispatch) => {
  dispatch({
    type: SET_FILTER_CLIMB_TYPE,
    payload: filterClimbType,
  });
};

export const setFilterStatus = (filterStatus) => (dispatch) => {
  dispatch({
    type: SET_FILTER_STATUS,
    payload: filterStatus,
  });
};

export const setFilterCircuits = (filterCircuits) => (dispatch) => {
  dispatch({
    type: SET_FILTER_CIRCUITS,
    payload: filterCircuits,
  });
};

export const removeFilterCircuits = (filterCircuits) => (dispatch) => {
  dispatch({
    type: REMOVE_FILTER_CIRCUITS,
    payload: filterCircuits,
  });
};

export const resetFilterCircuits = (filterCircuits) => (dispatch) => {
  dispatch({
    type: RESET_FILTER_CIRCUITS,
    payload: filterCircuits,
  });
};

export const setProfileData = (profileData) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_DATA,
    payload: profileData,
  });
};
