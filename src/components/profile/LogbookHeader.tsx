import { View, Text } from "react-native";
import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const LogbookHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Logbook" />;
};

export default LogbookHeader;
