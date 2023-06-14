import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
  const { userID } = useSelector((state) => state.userReducer);
  const { username } = useSelector((state) => state.userReducer);

  const [boulder, setBoulder] = useState(route.params.boulder);
  const [image, setImage] = useState({ uri: null, width: null, height: null });
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

  // get image base64 uri when on individual boulder screen. Not getting base64 image from list screen since it will take a long time to load every boulder card in list
  useEffect(() => {
    const getData = async () => {
      const response = await request("get", `boulder_image/${boulder.id}`);
      if (response.status !== 200) {
        console.log(response.status);
      }
      if (response.data) {
        setImage({
          uri: response.data.image_uri,
          width: response.data.image_width,
          height: response.data.image_height,
        });
      }
    };

    getData();
  }, []);

  // This event will be triggered when the screen gains focus (i.e., when you navigate back to it).
  useFocusEffect(
    useCallback(() => {
      fetchCertainData();
    }, [])
  );

  // re-fetching certain data (grade, quality, first ascent user) --> in the event of someone successfully sending (climbing) the boulder for the first time
  const fetchCertainData = async () => {
    const response = await request(
      "get",
      `sent_boulder/${boulder.id}/${userID}`
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
          image={image}
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
        userID={userID}
        username={username}
        setIsStatsVisible={setIsStatsVisible}
        navigation={navigation}
      />
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        uri={image.uri}
        image={{
          width: image.width,
          height: image.height,
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
