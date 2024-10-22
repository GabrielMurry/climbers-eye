import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeftIcon, PlusIcon } from "react-native-heroicons/outline";
import { colors } from "../utils/styles";

const THEME_STYLE = "white";

const useCustomHeader = ({
  navigation,
  title = "",
  headerRight = <></>,
  backgroundColor = null,
  screenName = null,
  headerRightOnPress = () => {},
}) => {
  if (screenName === "EditBoulder") {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Edit
          </Text>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={headerRightOnPress}>
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation]);
  } else if (screenName === "Circuit") {
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
        headerRight: () => (
          <TouchableOpacity onPress={headerRightOnPress}>
            <PlusIcon size={25} color={"black"} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: backgroundColor ?? THEME_STYLE,
        },
        headerShadowVisible: false,
      });
    }, [navigation, title, headerRight]);
  } else {
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
          backgroundColor: backgroundColor ?? THEME_STYLE,
        },
        headerShadowVisible: false,
      });
    }, [navigation, title, headerRight]);
  }
};

export default useCustomHeader;
