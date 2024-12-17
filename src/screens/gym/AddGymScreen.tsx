import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import useCustomHeader from "../../hooks/useCustomHeader";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AddressTextInput from "../../components/googlePlacesAutoComplete/AddressTextInput";
import { getGeoLocation } from "../../services/googleMapsAPI/geocoder";
import { createGym } from "../../services/gym";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";
import { RootNavigationProp } from "../../navigation/types/navigation";
import { useAppDispatch } from "../../redux/hooks";

const CHAR_LIMIT = 100;

const AddGymScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [isCommercialGym, setIsCommercialGym] = useState(true);
  const [gymName, setGymName] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [placeID, setPlaceID] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useCustomHeader({
    title: "Add New Gym",
  });

  const handleAddGym = () => {
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={styles.addNewGymContainer}>
          <View style={styles.typeContainer}>
            <Text style={styles.label}>Select Gym Type:</Text>
            <View style={styles.switchesContainer}>
              <View style={styles.switch}>
                <Text style={styles.subLabel}>Commercial Gym</Text>
                <Switch
                  value={isCommercialGym}
                  onValueChange={() => setIsCommercialGym(!isCommercialGym)}
                />
              </View>
              <View style={styles.switch}>
                <Text style={styles.subLabel}>Non-Commercial Gym (Home)</Text>
                <Switch
                  value={!isCommercialGym}
                  onValueChange={() => setIsCommercialGym(!isCommercialGym)}
                />
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {isCommercialGym ? "Gym" : "Home"} Name:
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                isCommercialGym ? "Enter gym name" : "Enter home name"
              }
              value={gymName}
              onChangeText={(text) => setGymName(text)}
            />
          </View>
          <View
            style={[
              styles.addressContainer,
              { opacity: isCommercialGym ? 1 : 0.25 },
            ]}
          >
            <Text style={styles.label}>Gym Address:</Text>
            <AddressTextInput
              address={gymAddress}
              setAddress={setGymAddress}
              placeholder={"Enter gym address"}
              description={"Gym Address to be displayed to all users."}
              charLimit={CHAR_LIMIT}
              setPlaceID={setPlaceID}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddGym}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.addButtonText}>
              Add {isCommercialGym ? "Gym" : "Home"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddGymScreen;

const styles = StyleSheet.create({
  addNewGymContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
    gap: 15,
  },
  addNewSprayWallContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  typeContainer: {
    alignSelf: "stretch",
  },
  addressContainer: {
    alignSelf: "stretch",
  },
  inputContainer: {
    alignSelf: "stretch",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 16,
  },
  switchesContainer: {
    alignItems: "center",
    gap: 5,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  imageButton: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButtonText: {
    fontSize: 16,
  },
  inputAndAddContainer: {
    alignSelf: "stretch",
  },
  addButton: {
    backgroundColor: "#007aff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
