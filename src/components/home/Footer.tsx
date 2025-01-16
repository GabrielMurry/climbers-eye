import { ActivityIndicator } from "react-native";
import React from "react";

type FooterProps = {
  isLoading: boolean;
};

const Footer: React.FC<FooterProps> = ({ isLoading }) => {
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return null;
};

export default Footer;
