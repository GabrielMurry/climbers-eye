import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import FullScreenImage from "../components/FullScreenImage";
import { request } from "../api/requestMethods";

const BoulderScreen = ({ route, navigation }) => {
  const { boulder } = route.params;

  const [image, setImage] = useState({ uri: null, width: null, height: null });
  const [imageFullScreen, setImageFullScreen] = useState(false);

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.titleContainer}>
        {/* Titles */}
        <Text style={styles.titleMain}>{boulder.name}</Text>
        <Text style={styles.titleSecondary}>
          {boulder.grade ?? "Project"} {boulder.rating ?? "Unrated"}
        </Text>
        <Text style={styles.titleThird}>
          Setter: {boulder.setter} FA: {boulder.firstAscent ?? "-"}
        </Text>
      </View>
      {/* Default Image */}
      <Pressable
        style={styles.imageContainer}
        onPress={() => setImageFullScreen(true)}
      >
        <Image
          source={{
            uri: image.uri,
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </Pressable>
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
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    marginBottom: 20,
  },
  titleMain: {
    fontSize: 30,
  },
  titleSecondary: {
    fontSize: 22,
  },
  titleThird: {
    fontSize: 16,
  },
  imageContainer: {
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
