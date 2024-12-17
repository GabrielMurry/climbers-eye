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
import { updateSpraywallAPI } from "../../services/spraywall";
import { updateSpraywall } from "../../redux/features/spraywall/spraywallSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpraywallStackParamList } from "../../navigation/SpraywallStack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type EditSpraywallNameScreenProps = NativeStackScreenProps<
  SpraywallStackParamList,
  "EditSpraywallName"
>;

const CHAR_LIMIT = 50;

const EditSpraywallNameScreen: React.FC<EditSpraywallNameScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const spraywall = route.params.spraywall;

  const [newSprayWallName, setNewSprayWallName] = useState(spraywall.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newSprayWallName !== spraywall.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newSprayWallName, spraywall.name]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { name: newSprayWallName };
    const pathParams = { spraywallId: spraywall.id };
    const response = await updateSpraywallAPI(pathParams, data);
    if (response.status === 200) {
      dispatch(updateSpraywall(spraywall.id, { name: newSprayWallName }));
      navigation.goBack();
    }
    setIsLoading(false);
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
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
