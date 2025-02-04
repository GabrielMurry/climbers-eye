import { SafeAreaView } from "react-native";
import React, { useRef, useState } from "react";
import Map from "../../components/map/Map";
import MapView from "react-native-maps";
import { Gym } from "../../utils/types/gym";
import { Spraywall } from "../../utils/types/spraywall";
import MapHeader from "../../components/map/MapHeader";
import MapBottomSheet from "../../components/map/MapBottomSheet";

export type MapMarker = {
  gym: Gym;
  spraywalls: Spraywall[];
};

const MapScreen = () => {
  const [marker, setMarker] = useState<MapMarker | null>(null);

  const mapRef = useRef<MapView>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapHeader />
      <Map mapRef={mapRef} marker={marker} />
      <MapBottomSheet mapRef={mapRef} />
    </SafeAreaView>
  );
};

export default MapScreen;
