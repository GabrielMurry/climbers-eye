import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import SettingsButton from "../../../components/editGymComponents/SettingsButton";
import Header from "../../../components/general/Header";

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <Header navigation={navigation} title={"Settings"} />
      {/* profile settings */}
      <View style={{ paddingHorizontal: 10 }}>
        {/* profile images */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 14 }}>Profile</Text>
        </View>
        <View style={{ backgroundColor: "white", borderRadius: 5 }}>
          <SettingsButton
            title={"Headshot Image"}
            onPress={() => navigation.navigate("Headshot")}
          />
          <SettingsButton title={"Name"} />
        </View>
        {/* delete gym */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 14, color: "red" }}>Delete</Text>
        </View>
        <View
          style={{
            backgroundColor: "red",
            borderRadius: 5,
          }}
        >
          <SettingsButton title={"Delete Profile"} textColor={"white"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
