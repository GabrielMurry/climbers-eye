import { View, Text } from "react-native";
import React from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import { useSelector } from "react-redux";
import SettingsButton from "../../components/custom/SettingsButton";
import DeleteSpraywall from "../../components/spraywall/DeleteSpraywall";

const EditSpraywallScreen = ({ navigation, route }) => {
  const index = route?.params?.index;
  const { spraywalls } = useSelector((state) => state.spraywallReducer);
  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: `Edit Spray Wall`,
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>{spraywalls[index].name}</Text>
      </View>
      <View style={{ backgroundColor: "white", borderRadius: 5 }}>
        <SettingsButton
          title={"Spray Wall Name"}
          onPress={() => navigation.navigate("EditSpraywallName", { index })}
        />
        <SettingsButton
          title={"Spray Wall Image"}
          onPress={() => navigation.navigate("EditSpraywallImage", { index })}
        />
      </View>
      <DeleteSpraywall navigation={navigation} spraywall={spraywalls[index]} />
    </View>
  );
};

export default EditSpraywallScreen;
