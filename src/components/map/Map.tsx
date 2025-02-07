import React, { Ref } from "react";
import MapView from "react-native-maps";
import GymMapMarker from "./GymMapMarker";
import { MapMarker } from "../../screens/map/MapScreen";

type MapProps = {
  mapRef: Ref<MapView>;
  marker: MapMarker | null;
};

const Map: React.FC<MapProps> = ({ mapRef, marker }) => {
  const initialRegion = {
    latitude: 38.575764,
    longitude: -121.478851,
    latitudeDelta: 0.05, // zoom scale
    longitudeDelta: 0.05,
  };

  return (
    <MapView ref={mapRef} initialRegion={initialRegion} style={{ flex: 1 }}>
      {marker ? <GymMapMarker marker={marker} /> : null}
    </MapView>
  );
};

export default Map;
