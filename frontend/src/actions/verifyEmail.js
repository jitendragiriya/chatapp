import axios from "axios";
import { BASE_URL, TOKEN } from "../constants";
import {
  VERIFY_EMAIL_FAIL, 
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCUSS,
} from "../constants/auth";
import { getLocalData } from "../hooks/localStorage";

//verify profile email
export const verifyEmail = (formbody) => async (dispatch) => {
  let url = `${BASE_URL}/api/verify-email`;
  try {
    dispatch({ type: VERIFY_EMAIL_REQUEST });
    const { data } = await axios.post(url, formbody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": await getLocalData(TOKEN),
      },
      withCredentials: true,
    });
    dispatch({
      type: VERIFY_EMAIL_SUCCUSS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};
