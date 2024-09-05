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
import EditData from "../../components/EditData";
import useCustomHeader from "../../hooks/useCustomHeader";

const EditGymTypeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [isCommercialGym, setIsCommercialGym] = useState(
    gym.type === "commercial"
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    const response = await request("patch", `api/gym/${gym.id}`, data);
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
          <EditData
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
