import { View, Text } from "react-native";
import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const EditGymTypeHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Edit Gym Type" />;
};

export default EditGymTypeHeader;
