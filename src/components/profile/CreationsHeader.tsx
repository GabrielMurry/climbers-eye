import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const CreationsHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Creations" />;
};

export default CreationsHeader;
