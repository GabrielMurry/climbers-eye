import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const StatisticsButton = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <View
        style={{
          width: "90%",
          gap: 20,
        }}
      >
        {/* Statistics Button */}
        <TouchableOpacity
          style={{ backgroundColor: "#FFFBF1", height: 75, borderRadius: 10 }}
        >
          <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}>
            Statistics
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StatisticsButton;
