import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const GymAndSprayWallButtons = ({ setIsModalVisible }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <View
        style={{
          width: "90%",
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Gym Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFBF1",
              flex: 1,
              height: 75,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={{ fontWeight: "bold" }}>The Boulder Field</Text>
          </TouchableOpacity>
          {/* Spray Wall Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFBF1",
              flex: 1,
              height: 75,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Main</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GymAndSprayWallButtons;
