import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FullScreenImage from "../components/FullScreenImage";
import { request } from "../api/requestMethods";
import { useFocusEffect } from "@react-navigation/native";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import Buttons from "../components/boulderComponents/Buttons";
import ImageDisplay from "../components/boulderComponents/ImageDisplay";
import Titles from "../components/boulderComponents/Titles";
import { Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import useCustomHeader from "../hooks/useCustomHeader";
import ModalOptions from "../components/ModalOptions";
import Notes from "../components/boulderComponents/Notes";

const THEME_STYLE = "white"; //rgba(245,245,245,255)

const BoulderScreen = ({ route, navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { user } = useSelector((state) => state.userReducer);

  const { fromScreen, toScreen } = route.params;

  const [boulder, setBoulder] = useState(route.params.boulder);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionsData, setOptionsData] = useState([]);

  const headerRight = (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <EllipsisHorizontalIcon size={35} color={"black"} />
    </TouchableOpacity>
  );

  // Use the custom hook
  useCustomHeader({
    navigation,
    fromScreen: fromScreen,
    toScreen: toScreen,
    title: "",
    headerRight,
  });

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      fetchCertainData();
    }, [])
  );

  // re-fetching certain data (grade, quality, first ascent user, did user send the boulder, liked, bookmarked, is boulder in a circuit) --> in the event of someone successfully sending (climbing) the boulder for the first time, or any other actions
  const fetchCertainData = async () => {
    const response = await request(
      "get",
      `updated_boulder_data/${boulder.id}/${user.id}`
    );
    if (response.status !== 200) {
      console.log(response.status);
    }
    if (response.data) {
      setBoulder({
        ...boulder,
        grade: response.data.grade,
        quality: response.data.quality,
        firstAscent: response.data.firstAscent,
        isSent: response.data.isSent,
        isLiked: response.data.isLiked,
        isBookmarked: response.data.isBookmarked,
        inCircuit: response.data.inCircuit,
      });
    }
  };

  const deleteBoulder = () => {
    Alert.alert(
      "Delete Boulder",
      `Are you sure you want to delete "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const response = await request(
              "delete",
              `delete_boulder/${boulder.id}`
            );
            if (response.status !== 200) {
              console.log(response.status);
              return;
            }
            navigation.goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const createOptionsData = () => {
      // start with commonOptions
      const commonOptions = [
        { title: "Share", onPress: "" },
        { title: "Report", onPress: "" },
        {
          title: "Cancel",
          onPress: () => setIsModalVisible(false),
          color: "gray",
        },
      ];
      // if your boulder is a draft, provide option to publish boulder
      if (!boulder.publish) {
        commonOptions.unshift({ title: "Publish Boulder", onPress: "" });
      }
      // if the boulder is yours, provide option to delete boulder
      if (boulder.setter === user.username) {
        const optionsData = [
          ...commonOptions.slice(0, -1), // Remove the last item ("Cancel")
          { title: "Delete", onPress: deleteBoulder, color: "red" },
          commonOptions[commonOptions.length - 1], // Add back the last item ("Cancel")
        ];
        return optionsData;
      }

      return commonOptions;
    };

    setOptionsData(createOptionsData());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageDisplay
          image={boulder}
          setImageFullScreen={setImageFullScreen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <Titles boulder={boulder} />
        <Buttons
          boulder={boulder}
          setBoulder={setBoulder}
          userID={user.id}
          navigation={navigation}
        />
        <Notes boulder={boulder} />
        {/* separator line */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "lightgray",
              marginTop: 20,
            }}
          />
        </View>
        {/* empty view cushion */}
        <View style={{ height: 50 }} />
      </ScrollView>
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      />
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={boulder.url}
        width={boulder.width}
        height={boulder.height}
        onRequestClose={() => setImageFullScreen(false)}
      />
    </View>
  );
};

export default BoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_STYLE,
  },
});
