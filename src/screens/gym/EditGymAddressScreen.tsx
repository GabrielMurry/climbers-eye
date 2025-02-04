import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import AddressTextInput from "../../components/googlePlacesAutoComplete/AddressTextInput";
import { getGeoLocation } from "../../services/googleMapsAPI/geocoder";
import { updateGymInfo } from "../../services/gym";
import { updateGym } from "../../redux/features/gym/gymSlice";
import { useNavigation } from "@react-navigation/native";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import EditGymAddressHeader from "../../components/gym/EditGymAddressHeader";

const CHAR_LIMIT = 100;

const EditGymAddressScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const gym = useAppSelector((state) => selectGym(state));
  const [newGymAddress, setNewGymAddress] = useState(gym.address);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [placeID, setPlaceID] = useState<number | null>(null);

  useEffect(() => {
    if (newGymAddress !== gym.address) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newGymAddress, gym.address]);

  const handleSave = async () => {
    setIsLoading(true);
    const geoData = await getGeoLocation(placeID);
    const data = {
      address: newGymAddress,
      latitude: geoData ? geoData.lat : null,
      longitude: geoData ? geoData.lng : null,
      place_id: placeID,
    };
    const pathParams = { gymId: gym.id };
    const response = await updateGymInfo({ pathParams, data });
    if (response.status === 200) {
      if (geoData && placeID) {
        dispatch(
          updateGym({
            address: newGymAddress,
            latitude: geoData.lat,
            longitude: geoData.lng,
            place_id: placeID,
          })
        );
      } else {
        console.error("No geo data or place ID found.");
      }
      navigation.goBack();
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <EditGymAddressHeader />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <AddressTextInput
          address={newGymAddress}
          setAddress={setNewGymAddress}
          // suggestions={addressSuggestions}
          // setSuggestions={setAddressSuggestions}
          placeholder={"Enter gym address"}
          setPlaceID={setPlaceID}
          charLimit={CHAR_LIMIT}
          description={"Gym address to be displayed to all users."}
        />
        {/* <SettingsTextInput
          text={newGymAddress}
          setText={setNewGymAddress}
          description={"Gym address to be displayed to all users."}
          charLimit={CHAR_LIMIT}
        /> */}
        <View>
          <TouchableOpacity
            style={[styles.button, isDisabled && styles.disabledButton]}
            disabled={isDisabled}
            onPress={handleSave}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditGymAddressScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(0, 122, 255)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#888",
  },
});
