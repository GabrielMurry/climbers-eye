import React, { Ref } from "react";
import MapView from "react-native-maps";
import GymMapMarker from "./GymMapMarker";
import { MapMarker } from "../../screens/map/MapScreen";

type MapProps = {
  mapRef: Ref<MapView>;
  marker: MapMarker | null;
  handleConfirmMyGymPress: (gymID: number) => void;
  isLoadingConfirmGym: boolean;
};

const Map: React.FC<MapProps> = ({
  mapRef,
  marker,
  handleConfirmMyGymPress,
  isLoadingConfirmGym,
}) => {
  const initialRegion = {
    latitude: 38.575764,
    longitude: -121.478851,
    latitudeDelta: 0.05, // zoom scale
    longitudeDelta: 0.05,
  };

  return (
    <MapView ref={mapRef} initialRegion={initialRegion} style={{ flex: 1 }}>
      {marker ? (
        <GymMapMarker
          marker={marker}
          handleConfirmMyGymPress={handleConfirmMyGymPress}
          isLoadingConfirmGym={isLoadingConfirmGym}
        />
      ) : null}
    </MapView>
  );
};

export default Map;
