import { View, Text } from "react-native";
import React from "react";
import SettingsButton from "../common/settings/SettingsButton";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywalls } from "../../redux/features/spraywall/spraywallSelectors";

const SpraywallSection = () => {
  const navigation = useNavigation();
  const spraywalls = useAppSelector((state) => selectSpraywalls(state));

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
        {spraywalls.map((spraywall) => (
          <SettingsButton
            key={spraywall.id.toString()}
            title={spraywall.name}
            onPress={() =>
              navigation.navigate("SpraywallStack", {
                screen: "EditSpraywall",
                params: { spraywall: spraywall },
              })
            }
          />
        ))}
      </View>
    </View>
  );
};

export default SpraywallSection;
