import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const LikesHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Likes" />;
};

export default LikesHeader;
