import { CLEAR_ERRORS, GET_ERRORS } from "./types";

type State = {
  message: JSON,
  status: String,
  id: String
};

const initialState: State = {
  message: {},
  status: null,
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS: {
      return {
        message: action.payload.message,
        state: action.payload.status,
        id: action.payload.id
      };
    }
    case CLEAR_ERRORS: {
      return {
        message: {},
        status: null,
        id: null
      };
    }
    default: {
      return state;
    }
  }
};
