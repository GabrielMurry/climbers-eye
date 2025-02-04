import { View, Text } from "react-native";
import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const CreateGymHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Create Gym" />;
};

export default CreateGymHeader;
