import { View, Text } from "react-native";
import React from "react";
import SettingsButton from "../SettingsButton";

const GymSection = ({ navigation }) => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>Gym</Text>
      </View>
      <View style={{ backgroundColor: "white", borderRadius: 5 }}>
        <SettingsButton
          title={"Gym Type"}
          onPress={() => navigation.navigate("EditGymType")}
        />
        <SettingsButton
          title={"Gym Name"}
          onPress={() => navigation.navigate("EditGymName")}
        />
        <SettingsButton
          title={"Gym Location"}
          onPress={() => navigation.navigate("EditGymLocation")}
        />
      </View>
    </View>
  );
};

export default GymSection;
