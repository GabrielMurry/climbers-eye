import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const THEME_STYLE = "white";

const useCustomHeader = ({ navigation, title = "", headerRight = <></> }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ width: 50 }}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={25} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24 }}>{title}</Text>
        </View>
      ),
      headerTitle: () => <Text></Text>,
      headerRight: () => headerRight,
      headerStyle: {
        backgroundColor: THEME_STYLE,
      },
      headerShadowVisible: false,
    });
  }, [navigation, title, headerRight]);
};

export default useCustomHeader;
