import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import {
  ArrowLeftCircleIcon,
  Cog8ToothIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";

const Header = ({ navigation }) => {
  const { headshotImage } = useSelector((state) => state.userReducer);
  const { spraywalls } = useSelector((state) => state.spraywallReducer);

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        gap: 5,
      }}
    >
      {/* banner and headshot image */}
      <View
        style={{
          width: "100%",
          height: 150,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 360,
            height: 100,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: "lightblue",
          }}
        >
          <ArrowLeftCircleIcon
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              left: 0,
              marginLeft: 5,
              marginTop: 5,
              zIndex: 1,
            }}
          />
          <Cog8ToothIcon
            size={30}
            color="black"
            style={{
              position: "absolute",
              right: 0,
              marginRight: 5,
              marginTop: 5,
              zIndex: 1,
            }}
            onPress={() => navigation.navigate("Settings")}
          />
          {/* <Image
            source={{ uri: spraywalls[0].url }}
            resizeMode="contain"
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
          /> */}
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: "100%",
              position: "absolute",
              bottom: "-50%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1.5,
              borderColor: "black",
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
      </View>
      <View style={{ alignItems: "center", gap: 5, paddingBottom: 5 }}>
        {/* Name */}
        <Text style={{ fontSize: 24 }}>Gabriel Murry</Text>
        {/* Username */}
        <Text style={{ fontSize: 18 }}>@Gabriel</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
