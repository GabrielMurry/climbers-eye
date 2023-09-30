import React from "react";
import MapView from "react-native-maps";
import GymMapMarker from "./GymMapMarker";

const Map = ({
  mapRef,
  gymMarker,
  handleConfirmMyGymPress,
  isLoadingConfirmGym,
}) => {
  return (
    <MapView
      ref={mapRef}
      initialRegion={{
        latitude: 38.575764,
        longitude: -121.478851,
        latitudeDelta: 0.05, // zoom scale
        longitudeDelta: 0.05,
      }}
      style={{ flex: 1 }}
    >
      {gymMarker ? (
        <GymMapMarker
          gymMarker={gymMarker}
          handleConfirmMyGymPress={handleConfirmMyGymPress}
          isLoadingConfirmGym={isLoadingConfirmGym}
        />
      ) : null}
    </MapView>
  );
};

export default Map;
