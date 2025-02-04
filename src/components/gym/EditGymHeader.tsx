import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const EditGymHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Edit Gym" />;
};

export default EditGymHeader;
