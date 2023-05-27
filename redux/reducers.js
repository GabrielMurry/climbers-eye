import {
  SET_USER_NAME,
  SET_USER_ID,
  SET_GYM_NAME,
  SET_SPRAYWALL_NAME,
  SET_SPRAYWALL_ID,
  SET_DEFAULT_IMAGE_URI,
  SET_DEFAULT_IMAGE_WIDTH,
  SET_DEFAULT_IMAGE_HEIGHT,
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
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, username: action.payload };
    case SET_USER_ID:
      return { ...state, userID: action.payload };
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
    default:
      return state;
  }
}
