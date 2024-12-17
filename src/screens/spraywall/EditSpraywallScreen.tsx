import { View, Text } from "react-native";
import React from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import { useSelector } from "react-redux";
import SettingsButton from "../../components/custom/SettingsButton";
import DeleteSpraywall from "../../components/spraywall/DeleteSpraywall";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpraywallStackParamList } from "../../navigation/SpraywallStack";
import { useNavigation } from "@react-navigation/native";

type EditSpraywallScreenProps = NativeStackScreenProps<
  SpraywallStackParamList,
  "EditSpraywall"
>;

const EditSpraywallScreen: React.FC<EditSpraywallScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const spraywall = route.params.spraywall;

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
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
        <Text style={{ fontSize: 14 }}>{spraywall.name}</Text>
      </View>
      <View style={{ backgroundColor: "white", borderRadius: 5 }}>
        <SettingsButton
          title={"Spray Wall Name"}
          onPress={() =>
            navigation.navigate("SpraywallStack", {
              screen: "EditSpraywallName",
              params: { spraywall: spraywall },
            })
          }
        />
        <SettingsButton
          title={"Spray Wall Image"}
          onPress={() =>
            navigation.navigate("SpraywallStack", {
              screen: "EditSpraywallImage",
              params: { spraywall: spraywall },
            })
          }
        />
      </View>
      <DeleteSpraywall spraywall={spraywall} />
    </View>
  );
};

export default EditSpraywallScreen;
