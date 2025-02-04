import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const CreateCircuitHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Create Circuit" />;
};

export default CreateCircuitHeader;
