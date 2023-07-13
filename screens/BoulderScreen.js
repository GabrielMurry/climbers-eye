import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import FullScreenImage from "../components/FullScreenImage";
import { request } from "../api/requestMethods";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinkIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import Buttons from "../components/boulderComponents/Buttons";
import ImageDisplay from "../components/boulderComponents/ImageDisplay";
import Titles from "../components/boulderComponents/Titles";
import BoulderBarChart from "../components/BoulderBarChart";

const BoulderScreen = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.userReducer);

  const [boulder, setBoulder] = useState(route.params.boulder);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FontAwesome
            name="trophy"
            size={24}
            color={boulder.isSent ? "green" : "gray"}
            style={boulder.isSent ? { opacity: 1 } : { opacity: 0.25 }}
          />
          <FontAwesome
            name="heart"
            size={24}
            color={boulder.isLiked ? "red" : "gray"}
            style={boulder.isLiked ? { opacity: 1 } : { opacity: 0.25 }}
          />
          <FontAwesome
            name="bookmark"
            size={24}
            color={boulder.isBookmarked ? "gold" : "gray"}
            style={boulder.isBookmarked ? { opacity: 1 } : { opacity: 0.25 }}
          />
          <LinkIcon
            size={24}
            color={boulder.inCircuit ? "blue" : "gray"}
            style={boulder.inCircuit ? { opacity: 1 } : { opacity: 0.5 }}
          />
        </View>
      ),
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
      {/* Titles */}
      <Titles boulder={boulder} />
      {/* Image */}
      {isStatsVisible ? (
        <BoulderBarChart boulder={boulder} />
      ) : (
        <ImageDisplay
          image={boulder}
          setImageFullScreen={setImageFullScreen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isStatsVisible={isStatsVisible}
        />
      )}
      {/* Buttons */}
      <Buttons
        boulder={boulder}
        setBoulder={setBoulder}
        userID={user.id}
        username={user.name}
        setIsStatsVisible={setIsStatsVisible}
        navigation={navigation}
      />
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={boulder.url}
        image={{
          width: boulder.width,
          height: boulder.height,
        }}
        onRequestClose={() => setImageFullScreen(false)}
      />
    </SafeAreaView>
  );
};

export default BoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
