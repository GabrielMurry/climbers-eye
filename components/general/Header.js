import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";

const Header = ({ navigation, title, style }) => {
  return (
    <SafeAreaView style={[{ alignItems: "center" }, style]}>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          marginLeft: 5,
          marginTop: 5,
        }}
      >
        <ArrowLeftCircleIcon
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            alignItems: "center",
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 24 }}>{title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
