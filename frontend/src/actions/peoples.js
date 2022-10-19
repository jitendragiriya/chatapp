import axios from "axios";
import { BASE_URL, TOKEN } from "../constants"; 
import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQ,
  GET_ALL_USERS_SUC,
} from "../constants/user";
import { getLocalData } from "../hooks/localStorage";

//get all peoples
export const getAllPeoples = (phone) => async (dispatch) => {
  const url = `/api/people/all`;
  try {
    dispatch({ type: GET_ALL_USERS_REQ });
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": await getLocalData(TOKEN),
      },
      withCredentials: true,
    });
    dispatch({
      type: GET_ALL_USERS_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
