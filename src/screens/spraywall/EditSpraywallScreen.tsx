import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import SettingsButton from "../../components/common/settings/SettingsButton";
import DeleteSpraywall from "../../components/spraywall/DeleteSpraywall";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpraywallStackParamList } from "../../navigation/SpraywallStack";
import { useNavigation } from "@react-navigation/native";
import EditSpraywallHeader from "../../components/spraywall/EditSpraywallHeader";

type EditSpraywallScreenProps = NativeStackScreenProps<
  SpraywallStackParamList,
  "EditSpraywall"
>;

const EditSpraywallScreen: React.FC<EditSpraywallScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const spraywall = route.params.spraywall;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <EditSpraywallHeader />
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
    </SafeAreaView>
  );
};

export default EditSpraywallScreen;
