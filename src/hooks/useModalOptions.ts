import { View, Text } from "react-native";
import React from "react";

type Option = {
  title: string;
  onPress: () => void;
  color: string;
};

const useModalOptions = (optionsData: Option[]) => {
  return { setIsVisible };
};

export default useModalOptions;
