import React from "react";
import Header from "../common/header/Header";
import BackIcon from "../common/header/BackIcon";

const TermsAndConditionsHeader = () => {
  return <Header leftIcon={<BackIcon />} centerText="Terms and Conditions" />;
};

export default TermsAndConditionsHeader;
