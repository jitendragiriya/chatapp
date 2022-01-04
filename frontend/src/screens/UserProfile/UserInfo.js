import React, { useEffect } from "react";
import "./UserInfo.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOhteruserDetails } from "../../reduxStore/actions/UserAction";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOhteruserDetails(id));
  }, [dispatch, id]);
  return (
    <div className="User-info">
      <h2>hi</h2>
    </div>
  );
};

export default UserInfo;
