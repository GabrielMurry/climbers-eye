import React, { RefObject, useState } from "react";
import MapSearchQuery from "./MapSearchQuery";
import MapSearchResults from "./MapSearchResults";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { MapMarker } from "../../screens/map/MapScreen";
import MapView from "react-native-maps";

type GymSearchProps = {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  setMarker: (marker: MapMarker) => void;
  mapRef: RefObject<MapView>;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

const GymSearch: React.FC<GymSearchProps> = ({
  bottomSheetRef,
  setMarker,
  mapRef,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      <MapSearchQuery
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bottomSheetRef={bottomSheetRef}
      />
      <MapSearchResults
        setMarker={setMarker}
        bottomSheetRef={bottomSheetRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mapRef={mapRef}
      />
    </>
  );
};

export default GymSearch;
