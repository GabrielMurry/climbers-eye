import { View, Text } from "react-native";
import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const EditGymAddressHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Edit Gym Address" />;
};

export default EditGymAddressHeader;
