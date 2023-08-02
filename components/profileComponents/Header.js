import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import {
  ArrowLeftCircleIcon,
  Cog8ToothIcon,
  UserIcon,
} from "react-native-heroicons/outline";

const Header = ({ navigation }) => {
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
            height: 100,
            width: "90%",
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
            }}
          />
          {/* <Image /> */}
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
            <UserIcon size={50} color={"black"} />
          </View>
        </View>
      </View>
      {/* Name */}
      <Text style={{ fontSize: 24 }}>Gabriel Murry</Text>
      {/* Username */}
      <Text style={{ fontSize: 18 }}>@Gabriel</Text>
    </SafeAreaView>
  );
};

export default Header;
