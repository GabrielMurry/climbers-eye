import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const SectionButtons = () => {
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
          {/* Logbook Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFBF1",
              flex: 1,
              height: 175,
              borderRadius: 10,
            }}
          >
            <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}>
              Logbook
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1, gap: 20 }}>
            {/* Likes Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFBF1",
                flex: 1,
                height: 75,
                borderRadius: 10,
              }}
            >
              <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}>
                Likes
              </Text>
            </TouchableOpacity>
            {/* Bookmarks Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFBF1",
                flex: 1,
                height: 75,
                borderRadius: 10,
              }}
            >
              <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}>
                Bookmarks
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Circuits Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFBF1",
              flex: 1,
              height: 75,
              borderRadius: 10,
            }}
          >
            <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}>
              Circuits
            </Text>
          </TouchableOpacity>
          {/* Created Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFBF1",
              flex: 1,
              height: 75,
              borderRadius: 10,
            }}
          >
            <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}>
              Created
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SectionButtons;
