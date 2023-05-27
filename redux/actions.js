export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_ID = "SET_USER_ID";
export const SET_GYM_NAME = "SET_GYM_NAME";
export const SET_SPRAYWALL_NAME = "SET_SPRAYWALL_NAME";
export const SET_SPRAYWALL_ID = "SET_SPRAYWALL_ID";
export const SET_DEFAULT_IMAGE_URI = "SET_DEFAULT_IMAGE_URI";
export const SET_DEFAULT_IMAGE_WIDTH = "SET_DEFAULT_IMAGE_WIDTH";
export const SET_DEFAULT_IMAGE_HEIGHT = "SET_DEFAULT_IMAGE_HEIGHT";

export const setUsername = (username) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: username,
  });
};

export const setUserID = (userID) => (dispatch) => {
  dispatch({
    type: SET_USER_ID,
    payload: userID,
  });
};

export const setGymName = (gymName) => (dispatch) => {
  dispatch({
    type: SET_GYM_NAME,
    payload: gymName,
  });
};

export const setSpraywallName = (spraywallName) => (dispatch) => {
  dispatch({
    type: SET_SPRAYWALL_NAME,
    payload: spraywallName,
  });
};

export const setSpraywallID = (spraywallID) => (dispatch) => {
  dispatch({
    type: SET_SPRAYWALL_ID,
    payload: spraywallID,
  });
};

export const setDefaultImageUri = (defaultImageUri) => (dispatch) => {
  dispatch({
    type: SET_DEFAULT_IMAGE_URI,
    payload: defaultImageUri,
  });
};

export const setDefaultImageWidth = (defaultImageWidth) => (dispatch) => {
  dispatch({
    type: SET_DEFAULT_IMAGE_WIDTH,
    payload: defaultImageWidth,
  });
};

export const setDefaultImageHeight = (defaultImageHeight) => (dispatch) => {
  dispatch({
    type: SET_DEFAULT_IMAGE_HEIGHT,
    payload: defaultImageHeight,
  });
};
