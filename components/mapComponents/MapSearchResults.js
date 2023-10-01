import { View, Text } from "react-native";
import React from "react";
import GymBottomSheetSearchResult from "./GymBottomSheetSearchResult";
import GymBottomSheetSearchEmpty from "./GymBottomSheetSearchEmpty";

const MapSearchResults = ({ searchQuery, navigation, gyms, renderItem }) => {
  return (
    <>
      {searchQuery ? (
        <GymBottomSheetSearchResult
          navigation={navigation}
          gyms={gyms}
          renderItem={renderItem}
        />
      ) : (
        <GymBottomSheetSearchEmpty />
      )}
    </>
  );
};

export default MapSearchResults;
