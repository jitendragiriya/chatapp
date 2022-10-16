import { CLEAR_ERROR } from "../constants/error";

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
