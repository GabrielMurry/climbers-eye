import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeftIcon, PlusIcon } from "react-native-heroicons/outline";
import { colors } from "../utils/styles";
import { useNavigation } from "@react-navigation/native";

const THEME_STYLE = "white";

type CustomHeader = {
  title: string;
  backgroundColor?: string;
  screenName?: string;
  headerRight?: React.JSX.Element;
  headerRightOnPress?: () => void;
};

const defaultCustomHeader = {
  title: "",
  backgroundColor: undefined,
  screenName: undefined,
  headerRight: undefined,
  headerRightOnPress: () => {},
};

const useCustomHeader = (props: CustomHeader = defaultCustomHeader) => {
  const navigation = useNavigation();
  if (props.screenName === "EditBoulder") {
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
          <TouchableOpacity onPress={props.headerRightOnPress}>
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
  } else if (props.screenName === "Circuit") {
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
            <Text style={{ fontSize: 24 }}>{props.title}</Text>
          </View>
        ),
        headerTitle: () => <Text></Text>,
        headerRight: () => (
          <TouchableOpacity onPress={props.headerRightOnPress}>
            <PlusIcon size={25} color={"black"} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: props.backgroundColor ?? THEME_STYLE,
        },
        headerShadowVisible: false,
      });
    }, [navigation, props.title, props.headerRight]);
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
            <Text style={{ fontSize: 24 }}>{props.title}</Text>
          </View>
        ),
        headerTitle: () => <Text></Text>,
        headerRight: () => props.headerRight,
        headerStyle: {
          backgroundColor: props.backgroundColor ?? THEME_STYLE,
        },
        headerShadowVisible: false,
      });
    }, [navigation, props.title, props.headerRight]);
  }
};

export default useCustomHeader;
