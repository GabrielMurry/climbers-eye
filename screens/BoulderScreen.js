import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import FullScreenImage from "../components/FullScreenImage";
import { request } from "../api/requestMethods";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BoulderScreen = ({ route, navigation }) => {
  const [boulder, setBoulder] = useState(route.params.boulder);
  const [image, setImage] = useState({ uri: null, width: null, height: null });
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [sent, setSent] = useState(true);

  const imageScaleDownFactor = image.width > image.height ? 11 : 9;

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

  const handleLiked = async () => {
    const method = boulder.personLiked ? "delete" : "post";
    const userId = await AsyncStorage.getItem("userId");
    const response = await request(
      method,
      `like_boulder/${boulder.id}/${userId}`
    );
    if (response.status !== 200) {
      console.log(response.status);
    }
    setBoulder({ ...boulder, personLiked: response.data.personLiked });
  };

  const handleSentBoulder = () => {
    navigation.navigate("Send", { boulder: boulder });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Titles */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleMain}>{boulder.name}</Text>
        <Text style={styles.titleSecondary}>
          {boulder.grade ?? "Project"} {boulder.rating ?? "Unrated"}
        </Text>
        <Text style={styles.titleThird}>
          Setter: {boulder.setter} FA: {boulder.firstAscent ?? "-"}
        </Text>
      </View>
      {/* Default Image */}
      <View style={styles.imageContainer}>
        <Pressable
          style={styles.image(image, imageScaleDownFactor)}
          onPress={() => setImageFullScreen(true)}
        >
          <Image
            source={{
              uri: image.uri,
            }}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
          {boulder.personLiked && (
            <FontAwesome
              name="heart"
              size={35}
              color="red"
              style={styles.heartDisplay}
            />
          )}
          {sent && (
            <FontAwesome
              name="check"
              size={45}
              color="green"
              style={styles.checkDisplay}
            />
          )}
        </Pressable>
      </View>
      {/* Buttons */}
      <View
        style={{ backgroundColor: "blue", justifyContent: "center", gap: 20 }}
      >
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <FontAwesome name="info" size={24} color="black" />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLiked}>
            {boulder.personLiked ? (
              <FontAwesome name="heart" size={24} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={24} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSentBoulder}>
            <FontAwesome
              name="check"
              size={24}
              color="black"
              style={styles.heart}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <FontAwesome name="info" size={24} color="black" />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLiked}>
            {boulder.personLiked ? (
              <FontAwesome name="heart" size={24} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={24} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSentBoulder}>
            <FontAwesome
              name="check"
              size={24}
              color="black"
              style={styles.heart}
            />
          </TouchableOpacity>
        </View>
      </View>
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
  titleContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
  },
  titleMain: {
    fontSize: 30,
  },
  titleSecondary: {
    fontSize: 20,
  },
  titleThird: {
    fontSize: 14,
  },
  imageContainer: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: (image, imageScaleDownFactor) => ({
    alignItems: "center",
    justifyContent: "center",
    width: image.width / imageScaleDownFactor,
    height: image.height / imageScaleDownFactor,
  }),
  heartDisplay: {
    position: "absolute",
    top: -15,
    left: -15,
    transform: [{ rotate: "-20deg" }],
  },
  checkDisplay: {
    position: "absolute",
    top: -25,
    right: -20,
  },
  buttonsContainer: {
    // height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
