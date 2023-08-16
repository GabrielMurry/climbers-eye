import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        height: 80,
        marginBottom: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ height: "25%" }} />
        <View style={{ height: "50%", justifyContent: "center" }}>
          {/* Name */}
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Gabriel Murry
          </Text>
        </View>
        <View style={{ height: "25%" }}>
          <Text style={{ fontSize: 16 }}>@Gabriel</Text>
        </View>
      </View>
      <View
        style={{
          width: 75,
          height: 75,
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
  );
};

export default Header;
