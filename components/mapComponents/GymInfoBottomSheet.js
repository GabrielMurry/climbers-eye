import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { colors } from "../../utils/styles";
import CustomButton from "../CustomButton";
import FullScreenImage from "../FullScreenImage";
import { useState } from "react";
import FlatListSpraywalls from "../listComponents/FlatListSpraywalls";

const GymInfoBottomSheet = ({
  gymMarker,
  isLoadingGymInfo,
  handleCancelGymPress,
  handleConfirmMyGymPress,
  // setImageFullScreen,
  isLoadingConfirmGym,
}) => {
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [spraywall, setSpraywall] = useState(null);

  const handleSpraywallPress = ({ item }) => {
    setImageFullScreen(true);
    setSpraywall(item);
  };

  return (
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
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                {gymMarker.name}
              </Text>
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
          <View
            style={{
              height: 100,
              justifyContent: "space-between",
            }}
          >
            <FlatListSpraywalls
              spraywalls={gymMarker.spraywalls}
              height={100}
              handleSpraywallPress={handleSpraywallPress}
            />
          </View>
          <CustomButton
            onPress={() => handleConfirmMyGymPress(gymMarker.id)}
            text="Confirm"
            isLoading={isLoadingConfirmGym}
            bgColor={colors.primary}
          />
        </>
      )}
      {/* <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={spraywall?.url}
        width={spraywall?.width}
        height={spraywall?.height}
        onRequestClose={() => setImageFullScreen(false)}
      /> */}
    </View>
  );
};

export default GymInfoBottomSheet;

const styles = StyleSheet.create({
  okButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomSheetGymContainer: {
    width: "100%",
    gap: 20,
    paddingHorizontal: 20,
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
    backgroundColor: colors.primary,
    width: 75,
    height: 75,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
