import { ActivityIndicator } from "react-native";
import React from "react";
import EmptyCard from "./EmptyCard";

type EmptyProps = {
  isLoading: boolean;
};

const Empty: React.FC<EmptyProps> = ({ isLoading }) => {
  if (isLoading) {
    return <ActivityIndicator />;
  }
  // <ErrorCard message={"Error retrieving boulders."} />
  else {
    return <EmptyCard message={"No boulders found."} />;
  }
};

export default Empty;
