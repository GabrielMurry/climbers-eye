import { Text } from "react-native";
import React from "react";

type TitleProps = {
  title?: string;
};

const Title: React.FC<TitleProps> = ({ title }) => {
  if (!title) return null;

  return <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>;
};

export default Title;
