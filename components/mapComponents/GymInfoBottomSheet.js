import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";

const GymInfoBottomSheet = ({
  gymMarker,
  isLoadingGymInfo,
  handleCancelGymPress,
  handleConfirmMyGymPress,
  setImageFullScreen,
  isLoadingConfirmGym,
}) => (
  <View style={styles.bottomSheetGymContainer}>
    {isLoadingGymInfo ? (
      <ActivityIndicator color="black" />
    ) : (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.bottomSheetGym}>
            <Text style={{ fontSize: 26 }}>{gymMarker.name}</Text>
            <Text style={{ fontSize: 16 }}>
              {gymMarker.address === "" ? "Home Gym" : gymMarker.address}
            </Text>
          </View>
          <View style={styles.bottomSheetCancelGymContainer}>
            <TouchableOpacity
              style={styles.bottomSheetCancelGymButton}
              onPress={handleCancelGymPress}
            >
              <XMarkIcon size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomSheetImageAndButtonContainer}>
          <View style={styles.bottomSheetImageContainer}>
            <TouchableOpacity
              style={styles.bottomSheetImage(gymMarker)}
              onPress={() => setImageFullScreen(true)}
            >
              <Image
                source={{ uri: gymMarker.spraywalls[0].base64 }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSheetConfirmGymContainer}>
            <TouchableOpacity
              style={styles.bottomSheetConfirmGymButton}
              onPress={() => handleConfirmMyGymPress(gymMarker.id)}
            >
              {isLoadingConfirmGym ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.okButtonText}>OK</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    )}
  </View>
);

export default GymInfoBottomSheet;

const styles = StyleSheet.create({
  okButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomSheetGymContainer: {
    width: "100%",
    gap: 20,
  },
  bottomSheetGym: {
    width: "80%",
    gap: 5,
  },
  bottomSheetCancelGymContainer: {
    width: "20%",
  },
  bottomSheetCancelGymButton: {
    backgroundColor: "lightgray",
    padding: 5,
    borderRadius: "100%",
    position: "absolute",
    right: 0,
  },
  bottomSheetImageAndButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomSheetImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: "50%",
    marginLeft: 10,
  },
  bottomSheetImage: (gymMarker) => ({
    width:
      gymMarker.spraywalls[0].width * (150 / gymMarker.spraywalls[0].height),
    height: "100%",
  }),
  bottomSheetConfirmGymContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetConfirmGymButton: {
    backgroundColor: "blue",
    width: 75,
    height: 75,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
