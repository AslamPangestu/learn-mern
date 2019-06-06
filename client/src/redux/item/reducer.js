import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./types";

type State = {
  items: [],
  isLoading: Boolean
};

const initialState: State = {
  items: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    }
    case ADD_ITEMS: {
      return {
        ...state,
        items: [action.payload, ...state.items],
        isLoading: false
      };
    }
    case DELETE_ITEMS: {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        isLoading: false
      };
    }
    case ITEMS_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading
      };
    }
    default: {
      return state;
    }
  }
};
