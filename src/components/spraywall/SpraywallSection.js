import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import SettingsButton from "../custom/SettingsButton";

const SpraywallSection = ({ navigation }) => {
  const { spraywalls } = useSelector((state) => state.spraywall);

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>Spraywall</Text>
      </View>
      <View style={{ backgroundColor: "white", borderRadius: 5 }}>
        {spraywalls.map((spraywall, index) => (
          <SettingsButton
            key={spraywall.id.toString()}
            title={spraywall.name}
            onPress={() =>
              navigation.navigate("SpraywallStack", {
                screen: "EditSpraywall",
                params: { index: index },
              })
            }
          />
        ))}
      </View>
    </View>
  );
};

export default SpraywallSection;
