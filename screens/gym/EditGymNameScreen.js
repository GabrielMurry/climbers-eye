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

const EditGymNameScreen = ({ navigation }) => {
  const CHAR_LIMIT = 50;

  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  console.log(gym);
  const [newGymName, setNewGymName] = useState(gym.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newGymName !== gym.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newGymName, gym.name]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { name: newGymName };
    const response = await request("patch", `api/gym/${gym.id}`, data);
    if (response.status === 200) {
      dispatch(updateGym({ name: newGymName }));
      navigation.goBack();
    }
    setIsLoading(false);
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Edit Gym Name",
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
          text={newGymName}
          setText={setNewGymName}
          description={"Gym name to be displayed to all users."}
          charLimit={CHAR_LIMIT}
        />
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
    </SafeAreaView>
  );
};

export default EditGymNameScreen;

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
