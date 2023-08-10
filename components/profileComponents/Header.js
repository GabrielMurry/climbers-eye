import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import {
  ArrowLeftCircleIcon,
  Cog8ToothIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ navigation }) => {
  const { headshotImage } = useSelector((state) => state.userReducer);
  const { spraywalls } = useSelector((state) => state.spraywallReducer);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 40,
        }}
      >
        <View>
          {/* Name */}
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>
            Gabriel Murry
          </Text>
          {/* Username */}
          <Text style={{ fontSize: 18 }}>@Gabriel</Text>
        </View>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          {headshotImage.url ? (
            <Image
              source={{ uri: headshotImage.url }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          ) : (
            <UserIcon size={50} color={"black"} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
