import React from "react";
import { Helmet } from "react-helmet";

const MetaTitle = ({ title }) => {
  return (
    <Helmet>
      <title>my work {title}</title>
    </Helmet>
  );
};

export default MetaTitle;
