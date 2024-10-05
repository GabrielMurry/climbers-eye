import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronRightIcon } from "react-native-heroicons/outline";

const SectionCard = ({ icon, title, data, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        borderBottomWidth: title === "Creations" ? 0 : 1,
        borderColor: "lightgray",
        height: 60,
        alignItems: "center",
        flexDirection: "row",
      }}
      onPress={() => navigation.navigate("Profile", { screen: "Logbook" })}
    >
      <View style={{ width: 30 }}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
      </View>
      <View
        style={{
          width: 75,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>{data}</Text>
      </View>
      <View
        style={{
          width: 50,
          alignItems: "center",
        }}
      >
        <ChevronRightIcon color={"black"} size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default SectionCard;
