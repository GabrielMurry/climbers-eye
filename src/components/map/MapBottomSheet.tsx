import React, { RefObject, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContent from "./BottomSheetContent";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import MapView from "react-native-maps";
import { MapMarker } from "../../screens/map/MapScreen";

type MapBottomSheet = {
  mapRef: RefObject<MapView>;
};

const MapBottomSheet: React.FC<MapBottomSheet> = ({ mapRef }) => {
  const [marker, setMarker] = useState<MapMarker | null>(null);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const snapPoints = useMemo(() => ["15%", "40%", "90%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: "rgb(250, 249, 246)", // off white
      }}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetContent
        bottomSheetRef={bottomSheetRef}
        mapRef={mapRef}
        marker={marker}
        setMarker={setMarker}
      />
    </BottomSheet>
  );
};

export default MapBottomSheet;
