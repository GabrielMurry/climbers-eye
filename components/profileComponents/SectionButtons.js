import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";

const SectionButtons = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "90%",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ flex: 1, gap: 10 }}>
            {/* Likes Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFBF1",
                flex: 1,
                height: 75,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>The Boulder Field</Text>
            </TouchableOpacity>
            {/* Bookmarks Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFBF1",
                flex: 1,
                height: 75,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}>
                Statistics
              </Text>
            </TouchableOpacity>
          </View>
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
        </View>
        <TouchableOpacity
          style={{
            height: 75,
            backgroundColor: "#FFFBF1",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Logbook</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "lightblue",
                width: "90%",
                height: "80%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>20</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 75,
            backgroundColor: "#FFFBF1",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Likes</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "lightblue",
                width: "90%",
                height: "80%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>20</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 75,
            backgroundColor: "#FFFBF1",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Bookmarks</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "lightblue",
                width: "90%",
                height: "80%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>20</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 75,
            backgroundColor: "#FFFBF1",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Circuits</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "lightblue",
                width: "90%",
                height: "80%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>20</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 75,
            backgroundColor: "#FFFBF1",
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Creations</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "lightblue",
                width: "90%",
                height: "80%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>20</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 75, backgroundColor: "black", borderRadius: 10 }}
        ></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SectionButtons;
