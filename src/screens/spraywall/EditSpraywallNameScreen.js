import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsTextInput from "../../components/custom/SettingsTextInput";
import useCustomHeader from "../../hooks/useCustomHeader";
import { updateSpraywallAPI } from "../../services/spraywall";
import { updateSpraywall } from "../../redux/features/spraywall/spraywallSlice";

const EditSpraywallNameScreen = ({ navigation, route }) => {
  const CHAR_LIMIT = 50;

  const dispatch = useDispatch();
  const index = route?.params?.index;
  const { spraywalls } = useSelector((state) => state.spraywall);
  const [newSprayWallName, setNewSprayWallName] = useState(
    spraywalls[index].name
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newSprayWallName !== spraywalls[index].name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newSprayWallName, spraywalls[index].name]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { name: newSprayWallName };
    const pathParams = { spraywallId: spraywalls[index].id };
    const response = await updateSpraywallAPI(pathParams, data);
    if (response.status === 200) {
      dispatch(
        updateSpraywall(spraywalls[index].id, { name: newSprayWallName })
      );
      navigation.goBack();
    }
    setIsLoading(false);
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Edit Spray Wall Name",
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
          text={newSprayWallName}
          setText={setNewSprayWallName}
          description={"Spray wall name to be displayed to all users."}
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

export default EditSpraywallNameScreen;

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
