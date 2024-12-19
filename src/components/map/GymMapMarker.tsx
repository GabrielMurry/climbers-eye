import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Callout, Marker } from "react-native-maps";
import { colors } from "../../utils/styles";
import { MapMarker } from "../../screens/map/MapScreen";

type GymMapMarkerProps = {
  marker: MapMarker;
  handleConfirmMyGymPress: (gymID: number) => void;
  isLoadingConfirmGym: boolean;
};

const GymMapMarker: React.FC<GymMapMarkerProps> = ({
  marker,
  handleConfirmMyGymPress,
  isLoadingConfirmGym,
}) => {
  return (
    <Marker
      coordinate={{
        latitude: marker.gym.latitude,
        longitude: marker.gym.longitude,
      }}
    >
      <Callout style={styles.calloutContainer}>
        <View style={styles.calloutContent}>
          <View style={styles.gymInfo}>
            <Text style={styles.gymName}>{marker.gym.name}</Text>
            <Text style={styles.gymAddress}>{marker.gym.address}</Text>
          </View>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => handleConfirmMyGymPress(marker.gym.id)}
          >
            {isLoadingConfirmGym ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.okButtonText}>OK</Text>
            )}
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
  );
};

export default GymMapMarker;

const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
  },
  calloutContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  gymInfo: {
    flex: 1,
    marginRight: 10,
  },
  gymName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  gymAddress: {
    fontSize: 14,
    color: "gray",
  },
  okButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  okButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
