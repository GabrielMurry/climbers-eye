import { View, Text } from "react-native";
import React from "react";
import GymBottomSheetSearchResult from "./GymBottomSheetSearchResult";
import GymBottomSheetSearchEmpty from "./GymBottomSheetSearchEmpty";
import { Gym } from "../../utils/types/gym";

type MapSearchResultsProps = {
  searchQuery: string;
  gyms: Gym[] | null;
  handleGymCardPress: (gym: Gym) => void;
};

const MapSearchResults: React.FC<MapSearchResultsProps> = ({
  searchQuery,
  gyms,
  handleGymCardPress,
}) => {
  return (
    <>
      {gyms ? (
        <GymBottomSheetSearchResult
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
