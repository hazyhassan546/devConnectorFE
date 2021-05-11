import {
  ADD_COMMENT_SUCCESS,
  CREATE_POST_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_ALL_POST,
  GET_ALL_POST_ERROR,
  GET_ALL_POST_SUCCESS,
  GET_SINGLE_POST,
  GET_SINGLE_POST_ERROR,
  GET_SINGLE_POST_SUCCESS,
  LIKE_POST_SUCCESS,
  UNLIKE_POST,
  UNLIKE_POST_SUCCESS,
} from "../action/types";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SINGLE_POST_SUCCESS:
    case ADD_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        post: payload,
        loading: false,
      };
    }
    case GET_SINGLE_POST:
    case GET_ALL_POST: {
      return {
        ...state,
        loading: true,
        post: null,
      };
    }
    case GET_ALL_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    }
    case GET_SINGLE_POST_ERROR:
    case GET_ALL_POST_ERROR: {
      return {
        ...state,
        post: null,
        loading: false,
      };
    }
    case LIKE_POST_SUCCESS: {
      let index = state.posts.map((item) => item._id).indexOf(payload.postId);
      let temp = state.posts;
      if (index !== -1) {
        temp[index].likes = payload.data;
      }
      return {
        ...state,
        loading: false,
        posts: temp,
      };
    }
    case UNLIKE_POST_SUCCESS: {
      let index = state.posts.map((item) => item._id).indexOf(payload.postId);
      let temp = state.posts;
      if (index !== -1) {
        temp[index].likes = payload.data;
      }
      return {
        ...state,
        loading: false,
        posts: temp,
      };
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    }
    case DELETE_POST_SUCCESS: {
      let index = state.posts.map((item) => item._id).indexOf(payload.postId);
      let temp = state.posts;
      if (index !== -1) {
        temp.splice(index, 1);
      }
      return {
        ...state,
        loading: false,
        posts: temp,
      };
    }
    default: {
      return state;
    }
  }
}
