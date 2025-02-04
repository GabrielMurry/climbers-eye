import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { colors } from "../../utils/styles";
import CustomButton from "../custom/CustomButton";
import { RefObject, useState } from "react";
import FlatListSpraywalls from "../home/FlatListSpraywalls";
import { MapMarker } from "../../screens/map/MapScreen";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useAppDispatch } from "../../redux/hooks";
import { userChooseGym } from "../../services/gym";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";
import { useNavigation } from "@react-navigation/native";

type GymOverviewProps = {
  marker: MapMarker;
  setMarker: (marker: MapMarker | null) => void;
  bottomSheetRef: RefObject<BottomSheetMethods>;
  setSearchQuery: (searchQuery: string) => void;
};

const GymOverview: React.FC<GymOverviewProps> = ({
  marker,
  setMarker,
  bottomSheetRef,
  setSearchQuery,
}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleCancelGymPress = () => {
    setMarker(null);
    setSearchQuery("");
    bottomSheetRef.current?.snapToIndex(1);
  };

  const handleConfirmMyGymPress = async (gymID: number) => {
    setIsLoadingSubmit(true);
    const data = {
      gym: gymID,
    };
    const response = await userChooseGym(data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoadingSubmit(false);
      return;
    }
    dispatch(setGym(marker!.gym));
    dispatch(setSpraywalls(marker!.spraywalls));
    navigation.navigate("TabsStack", {
      screen: "HomeStack",
      params: { screen: "HomeList" },
    });
    setIsLoadingSubmit(false);
  };

  return (
    <View style={styles.bottomSheetGymContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.bottomSheetGym}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            {marker.gym.name}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {marker.gym.address === "" ? "Home Gym" : marker.gym.address}
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
          spraywallsDataProp={marker.spraywalls}
          height={100}
        />
      </View>
      <CustomButton
        onPress={() => handleConfirmMyGymPress(marker.gym.id)}
        text="Confirm"
        isLoading={isLoadingSubmit}
        bgColor={colors.primary}
      />
    </View>
  );
};

export default GymOverview;

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
