import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Callout, Marker } from "react-native-maps";

const GymMapMarker = ({
  gymMarker,
  handleConfirmMyGymPress,
  isLoadingConfirmGym,
}) => (
  <Marker
    coordinate={{
      latitude: gymMarker.latitude,
      longitude: gymMarker.longitude,
    }}
  >
    <Callout style={styles.calloutContainer}>
      <View style={styles.calloutContent}>
        <View style={styles.gymInfo}>
          <Text style={styles.gymName}>{gymMarker.name}</Text>
          <Text style={styles.gymAddress}>{gymMarker.address}</Text>
        </View>
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => handleConfirmMyGymPress(gymMarker.id)}
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
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  okButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
