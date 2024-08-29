export const SET_USER = "SET_USER";
export const SET_GYM = "SET_GYM";
export const SET_SPRAYWALLS = "SET_SPRAYWALLS";
export const APPEND_SPRAYWALLS = "APPEND_SPRAYWALLS";
export const SET_SPRAYWALL_INDEX = "SET_SPRAYWALL_INDEX";
export const DELETE_SPRAYWALL = "DELETE_SPRAYWALL";
export const SET_FILTER_SORT_BY = "SET_FILTER_SORT_BY";
export const SET_FILTER_MIN_GRADE_INDEX = "SET_FILTER_MIN_GRADE_INDEX";
export const SET_FILTER_MAX_GRADE_INDEX = "SET_FILTER_MAX_GRADE_INDEX";
export const SET_FILTER_ACTIVITY = "SET_FILTER_ACTIVITY";
export const SET_FILTER_CLIMB_TYPE = "SET_FILTER_CLIMB_TYPE";
export const SET_FILTER_STATUS = "SET_FILTER_STATUS";
export const SET_FILTER_CIRCUITS = "SET_FILTER_CIRCUITS";
export const REMOVE_FILTER_CIRCUITS = "REMOVE_FILTER_CIRCUITS"; // don't need?
export const RESET_FILTER_CIRCUITS = "RESET_FILTER_CIRCUITS"; // don't need?
export const APPEND_BOULDERS = "APPEND_BOULDERS";
export const RESET_BOULDERS = "RESET_BOULDERS";
export const BOULDERS_ERROR = "BOULDERS_ERROR";
export const UPDATE_BOULDER = "UPDATE_BOULDER";
export const ADD_NEW_BOULDER = "ADD_NEW_BOULDER";
export const DELETE_BOULDER = "DELETE_BOULDER";

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

export const appendSpraywalls = (spraywalls) => ({
  type: APPEND_SPRAYWALLS,
  payload: spraywalls,
});

export const setSpraywallIndex = (spraywallIndex) => (dispatch) => {
  dispatch({
    type: SET_SPRAYWALL_INDEX,
    payload: spraywallIndex,
  });
};

export const deleteSpraywall = (spraywallId) => ({
  type: DELETE_SPRAYWALL,
  payload: spraywallId,
});

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

export const appendBoulders = (boulders) => ({
  type: APPEND_BOULDERS,
  payload: boulders,
});

export const resetBoulders = () => ({
  type: RESET_BOULDERS,
});

export const bouldersError = (errorContent) => ({
  type: BOULDERS_ERROR,
  payload: errorContent,
});

export const updateBoulder = (boulderId, updates) => ({
  type: UPDATE_BOULDER,
  payload: { boulderId, updates },
});

export const addNewBoulder = (boulder) => ({
  type: ADD_NEW_BOULDER,
  payload: boulder,
});

export const deleteBoulder = (boulderId) => ({
  type: DELETE_BOULDER,
  payload: boulderId,
});
