import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../../utils/styles";
import { Boulder } from "../../../utils/types/boulder";
import { ChartData } from "../../../screens/boulder/BoulderScreen";
import { UserSendsData } from "../../../screens/boulder/types";
import { useNavigation } from "@react-navigation/native";

type InfoRow2Props = {
  boulder: Boulder;
  chartData: ChartData[];
  userSendsData: UserSendsData[];
};

const InfoRow2: React.FC<InfoRow2Props> = ({
  boulder,
  chartData,
  userSendsData,
}) => {
  const navigation = useNavigation();

  const handleBoulderStatsPress = () => {
    navigation.navigate("BoulderStack", {
      screen: "BoulderStats",
      params: { boulder, chartData },
    });
  };

  const handleSentBoulderPress = () => {
    navigation.navigate("BoulderStack", {
      screen: "SendBoulder",
      params: { boulder, userSendsData },
    });
  };

  const handleUserSendsCountPress = () => {
    navigation.navigate("BoulderStack", {
      screen: "BoulderUserSends",
      params: { userSendsData },
    });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        height: 50,
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          onPress={handleBoulderStatsPress}
          style={{
            width: 50,
            height: 35,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(235, 235, 235, 255)",
          }}
        >
          <FontAwesome name="book" size={24} color="black" />
        </TouchableOpacity>
        {boulder?.userSendsCount > 0 ? (
          <TouchableOpacity
            onPress={handleUserSendsCountPress}
            style={{
              width: 50,
              height: 35,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(235, 235, 235, 255)",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {boulder?.userSendsCount}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 5,
          flex: 0.6,
          justifyContent: "space-evenly",
          height: 35,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: boulder.isSent
            ? colors.primary
            : "rgba(235, 235, 235, 255)",
        }}
        onPress={handleSentBoulderPress}
      >
        <Text
          style={{
            color: boulder.isSent ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {boulder.isSent ? "Repeat" : "Log Send"}
        </Text>
        <ArrowLongRightIcon
          size={25}
          color={boulder.isSent ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InfoRow2;
