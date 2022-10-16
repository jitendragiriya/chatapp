import { LOGOUT } from "../constants/auth";
import { notifySuccess } from "../utils/Messages";

// logout user
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
  sessionStorage.clear();
  notifySuccess("Your are log out now.");
};
