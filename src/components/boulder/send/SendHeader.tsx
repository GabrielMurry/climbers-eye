import React from "react";
import Header from "../../common/header/Header";
import BackIcon from "../../common/header/BackIcon";

const SendHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Log Ascent" />;
};

export default SendHeader;
