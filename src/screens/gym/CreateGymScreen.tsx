import React, { useState } from "react";
import { SafeAreaView, Alert, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { getGeoLocation } from "../../services/googleMapsAPI/geocoder";
import { createGym } from "../../services/gym";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";
import { useAppDispatch } from "../../redux/hooks";
import CreateGymHeader from "../../components/gym/CreateGymHeader";
import CreateGymBody from "../../components/gym/CreateGymBody";
import CommonSubmitButton from "../../components/common/CommonSubmitButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { padding } from "../../utils/styles";

const CreateGymScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const [isCommercialGym, setIsCommercialGym] = useState(true);
  const [gymName, setGymName] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [placeID, setPlaceID] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGym = () => {
    Alert.alert(
      "Add Gym",
      `Are you sure you want to add "${gymName}""?`,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: async () => {
            setIsLoading(true);
            const geoData = await getGeoLocation(placeID);
            const data = {
              name: gymName,
              type: isCommercialGym ? "commercial" : "home",
              address: gymAddress,
              latitude: geoData ? geoData.lat : null,
              longitude: geoData ? geoData.lng : null,
              place_id: placeID,
            };
            const response = await createGym({ data });
            if (response.status === 201) {
              dispatch(setGym(response.data));
              dispatch(setSpraywalls([]));
              navigation.dispatch(
                CommonActions.reset({
                  index: 0, // This sets "Home" as the first screen in the stack
                  routes: [{ name: "Tabs" }], // Define the route to the "Home" screen
                })
              );
            } else {
              console.log(response.status);
            }
            setIsLoading(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
      }}
    >
      <CreateGymHeader />
      <View style={{ flex: 1, paddingHorizontal: padding.general }}>
        <CreateGymBody
          isCommercialGym={isCommercialGym}
          setIsCommercialGym={setIsCommercialGym}
          gymName={gymName}
          setGymName={setGymName}
          gymAddress={gymAddress}
          setGymAddress={setGymAddress}
          setPlaceID={setPlaceID}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: insets.bottom,
          }}
        >
          <CommonSubmitButton onPress={handleCreateGym} />
        </View>
      </View>
    </View>
  );
};

export default CreateGymScreen;
