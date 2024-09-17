import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Switch,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsTextInput from "../../components/custom/SettingsTextInput";
import useCustomHeader from "../../hooks/useCustomHeader";

const EditGymLocationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [newGymAddress, setNewGymAddress] = useState(gym.address);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const CHAR_LIMIT = 100;

  useEffect(() => {
    if (newGymAddress !== gym.address) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newGymAddress, gym.address]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { address: newGymAddress };
    const response = await request("patch", `api/gym/${gym.id}`, data);
    if (response.status === 200) {
      dispatch(updateGym({ address: newGymAddress }));
      navigation.goBack();
    }
    setIsLoading(false);
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Edit Gym Address",
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <SettingsTextInput
          text={newGymAddress}
          setText={setNewGymAddress}
          description={"Gym address to be displayed to all users."}
          charLimit={CHAR_LIMIT}
        />
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

export default EditGymLocationScreen;

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
