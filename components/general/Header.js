import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";

const Header = ({ navigation, title, color = null, style }) => {
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
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 24 }}>{title}</Text>
          {color ? (
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: color,
                borderRadius: 100,
              }}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
