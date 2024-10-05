import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const THEME_STYLE = "white";

const useCustomHeader = ({
  navigation,
  fromScreen = null,
  toScreen = null,
  title = "",
  headerRight = <></>,
  backgroundColor = null,
}) => {
  const navHandler = () => {
    if (fromScreen === "EditBoulder" && toScreen === "Home") {
      navigation.navigate("Tabs", { screen: "Home" });
    } else {
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: fromScreen === "EditBoulder" ? false : true,
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ width: 50 }} onPress={navHandler}>
            <ChevronLeftIcon size={25} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24 }}>{title}</Text>
        </View>
      ),
      headerTitle: () => <Text></Text>,
      headerRight: () => headerRight,
      headerStyle: {
        backgroundColor: backgroundColor ?? THEME_STYLE,
      },
      headerShadowVisible: false,
    });
  }, [navigation, title, headerRight]);
};

export default useCustomHeader;
