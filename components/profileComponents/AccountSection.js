import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ChevronRightIcon,
  Cog8ToothIcon,
  WrenchScrewdriverIcon,
} from "react-native-heroicons/outline";

const AccountSection = ({ navigation }) => {
  return (
    <View
      contentContainerStyle={{
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={{ backgroundColor: "lightgray", height: 3 }} />
        <View
          style={{
            paddingHorizontal: 30,
            marginTop: 10,
            flexDirection: "row",
            height: 30,
            alignItems: "center",
          }}
        >
          {/* section title */}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Account</Text>
        </View>
        <View style={{ paddingLeft: 30 }}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <View style={{ width: 30 }}>
              <WrenchScrewdriverIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Edit Profile</Text>
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
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={{ width: 30 }}>
              <Cog8ToothIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Settings and Privacy</Text>
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
        </View>
      </View>
    </View>
  );
};

export default AccountSection;
