import { View } from "react-native";
import React, { RefObject, useState } from "react";
import { MapMarker } from "../../screens/map/MapScreen";
import GymOverview from "./GymOverview";
import GymSearch from "./GymSearch";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import MapView from "react-native-maps";

type BottomSheetContentProps = {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  mapRef: RefObject<MapView>;
  marker: MapMarker | null;
  setMarker: (marker: MapMarker | null) => void;
};

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  bottomSheetRef,
  mapRef,
  marker,
  setMarker,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        gap: 10,
      }}
    >
      {marker ? (
        <GymOverview
          marker={marker}
          setMarker={setMarker}
          bottomSheetRef={bottomSheetRef}
          setSearchQuery={setSearchQuery}
        />
      ) : (
        <GymSearch
          bottomSheetRef={bottomSheetRef}
          setMarker={setMarker}
          mapRef={mapRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </View>
  );
};

export default BottomSheetContent;
