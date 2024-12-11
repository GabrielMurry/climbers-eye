import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import SettingsTextInput from "../../components/custom/SettingsTextInput";
import useCustomHeader from "../../hooks/useCustomHeader";
import { updateGymInfo } from "../../services/gym";
import { updateGym } from "../../redux/features/gym/gymSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../navigation/types/navigation";

const CHAR_LIMIT = 50;

const EditGymNameScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const dispatch = useAppDispatch();
  const gym = useAppSelector((state) => selectGym(state));
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
    const pathParams = { gymId: gym.id };
    const response = await updateGymInfo({ pathParams, data });
    if (response.status === 200) {
      dispatch(updateGym({ name: newGymName }));
      navigation.goBack();
    }
    setIsLoading(false);
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
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
