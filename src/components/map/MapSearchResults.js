import { View, Text } from "react-native";
import React from "react";
import GymBottomSheetSearchResult from "./GymBottomSheetSearchResult";
import GymBottomSheetSearchEmpty from "./GymBottomSheetSearchEmpty";

const MapSearchResults = ({
  searchQuery,
  navigation,
  gyms,
  handleGymCardPress,
}) => {
  return (
    <>
      {gyms ? (
        <GymBottomSheetSearchResult
          navigation={navigation}
          gyms={gyms}
          handleGymCardPress={handleGymCardPress}
        />
      ) : (
        <GymBottomSheetSearchEmpty />
      )}
    </>
  );
};

export default MapSearchResults;
