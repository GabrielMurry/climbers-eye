import { SafeAreaView, View } from "react-native";
import React, { useRef, useState } from "react";
import Map from "../../components/map/Map";
import MapView from "react-native-maps";
import { Gym } from "../../utils/types/gym";
import { Spraywall } from "../../utils/types/spraywall";
import MapHeader from "../../components/map/MapHeader";
import MapBottomSheet from "../../components/map/MapBottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type MapMarker = {
  gym: Gym;
  spraywalls: Spraywall[];
};

const MapScreen = () => {
  const [marker, setMarker] = useState<MapMarker | null>(null);

  const mapRef = useRef<MapView>(null);

  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <MapHeader />
      <Map mapRef={mapRef} marker={marker} />
      <MapBottomSheet mapRef={mapRef} />
    </View>
  );
};

export default MapScreen;
