import React, { useState, useEffect } from "react";
import OnePeople from "./OnePeople";

const AllPeoples = (props) => {
  const [peoples, setPeoples] = useState([]);

  useEffect(async () => {
    if (
      props.peoples &&
      Array.isArray(props.peoples) &&
      props.user &&
      props.user._id
    ) {
      const result = await props.peoples.filter(
        (data) => data._id !== props.user._id
      );
      setPeoples(result);
    }
  }, [props.peoples]);

  return (
    <>
      <div className="overflow-auto h-full">
        <div className="w-full p-3 py-2 bg-gradient-to-r from-[#e6e6e6] to-white text-2xl capitalize text-black">
          Peoples
        </div>

        {peoples.length ? (
          peoples.map((value, index) => (
            <OnePeople key={index} people={value} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AllPeoples;
