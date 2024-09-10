import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import SettingsButton from "../custom/SettingsButton";

const SpraywallSection = ({ navigation }) => {
  const { spraywalls } = useSelector((state) => state.spraywallReducer);
  const renderSpraywallSettingCards = ({ item }) => (
    <SettingsButton
      title={item.name}
      onPress={() => navigation.navigate("EditGymType")}
    />
  );
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
            onPress={() => navigation.navigate("EditSpraywall", { index })}
          />
        ))}
        {/* <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
          }}
        >
          <SettingsButton
            title={"Add New Spray Wall"}
            onPress={() => navigation.navigate("AddNewSprayWall")}
          />
        </View> */}
      </View>
    </View>
  );
};

export default SpraywallSection;
