import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const EditProfileHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Edit Profile" />;
};

export default EditProfileHeader;
