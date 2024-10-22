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
import { updateGymInfo } from "../../services/gym";
import { updateGym } from "../../redux/features/gym/gymSlice";

const EditGymTypeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);
  const [isCommercialGym, setIsCommercialGym] = useState(
    gym.type === "commercial"
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [fetchUpdate, isLoadingUpdate, isErrorUpdate] = useFetch(updateGymInfo);

  useEffect(() => {
    const newType = isCommercialGym ? "commercial" : "home";
    if (newType !== gym.type) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isCommercialGym, gym.type]);

  const handleSave = async () => {
    setIsLoading(true);
    const newType = isCommercialGym ? "commercial" : "home";
    const data = { type: newType };
    const pathParams = { gymId: gym.id };
    const response = await fetchUpdate({ pathParams, data });
    if (response.status === 200) {
      dispatch(updateGym({ type: newType }));
      navigation.goBack();
    }
    setIsLoading(false);
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Edit Gym Type",
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
        <View>
          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Commercial Gym
              </Text>
              <Switch
                value={isCommercialGym}
                onValueChange={() => setIsCommercialGym(!isCommercialGym)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Non-Commercial Gym (Home)
              </Text>
              <Switch
                value={!isCommercialGym}
                onValueChange={() => setIsCommercialGym(!isCommercialGym)}
              />
            </View>
          </View>
          <SettingsTextInput
            description={
              'Choosing "Commercial Gym" requires an address of the gym. "Home Gym" remains private.'
            }
          />
        </View>
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

export default EditGymTypeScreen;

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
