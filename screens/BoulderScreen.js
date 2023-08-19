import { View, StyleSheet, SafeAreaView, BackHandler } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import FullScreenImage from "../components/FullScreenImage";
import { request } from "../api/requestMethods";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import {
  ArrowLeftCircleIcon,
  ChevronLeftIcon,
  LinkIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import Buttons from "../components/boulderComponents/Buttons";
import ImageDisplay from "../components/boulderComponents/ImageDisplay";
import Titles from "../components/boulderComponents/Titles";
import BoulderBarChart from "../components/BoulderBarChart";

const THEME_STYLE = "rgba(245,245,245,255)";

const BoulderScreen = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.userReducer);

  const { fromScreen, toScreen } = route.params;

  const [boulder, setBoulder] = useState(route.params.boulder);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: fromScreen === "EditBoulder" ? false : true,
      headerLeft: () => (
        <ChevronLeftIcon
          size={25}
          color="black"
          onPress={() => {
            if (toScreen === "ProfileSection") {
              navigation.goBack();
            } else {
              navigation.navigate(toScreen);
            }
          }}
        />
      ),
      headerRight: () => {},
      headerStyle: {
        backgroundColor: THEME_STYLE,
      },
    });
  }, [navigation, boulder]);

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

  return (
    <SafeAreaView style={styles.container}>
      <ImageDisplay
        image={boulder}
        setImageFullScreen={setImageFullScreen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {/* <Titles boulder={boulder} /> */}
      {/* Buttons */}
      {/* <Buttons
        boulder={boulder}
        setBoulder={setBoulder}
        userID={user.id}
        username={user.name}
        navigation={navigation}
      /> */}
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={boulder.url}
        width={boulder.width}
        height={boulder.height}
        onRequestClose={() => setImageFullScreen(false)}
      />
    </SafeAreaView>
  );
};

export default BoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_STYLE,
  },
});
