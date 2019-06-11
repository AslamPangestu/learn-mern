import { CLEAR_ERRORS, GET_ERRORS } from "./types";

const returnError = (message, status, id) => ({
  type: GET_ERRORS,
  payload: { message, status, id }
});

const clearError = () => ({
  type: CLEAR_ERRORS
});

export default { returnError, clearError };
