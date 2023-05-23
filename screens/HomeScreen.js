import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { request } from "../api/requestMethods";

const HomeScreen = ({ navigation }) => {
  const [gymName, setGymName] = useState("");
  const [spraywallName, setSpraywallName] = useState("");
  const [image, setImage] = useState({ uri: null, width: null, height: null });

  useEffect(() => {
    const getData = async () => {
      const response = await request("get", "home/");
      if (response.status !== 200) {
        console.log(response.status);
      }
      if (response.data) {
        setGymName(response.data.gymName);
        setSpraywallName(response.data.spraywallName);
        setImage({
          uri: response.data.imageUri,
          width: response.data.imageWidth,
          height: response.data.imageHeight,
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
        <Text style={styles.titleText}>{gymName}</Text>
        <Text style={styles.subTitleText}>{spraywallName}</Text>
      </View>
      {/* Default Image */}
      <View style={styles.defaultImageContainer}>
        <Image
          source={{ uri: image.uri }}
          resizeMode="contain"
          style={styles.defaultImage}
        />
      </View>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("List", { gymName, spraywallName })
          }
        >
          <Text>Find Boulders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("List")}
        >
          <Text>Find Routes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("AddBoulder", { image, spraywallName })
          }
        >
          <Text>Add Boulder/Route</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
  },
  subTitleText: {
    fontSize: 24,
  },
  defaultImageContainer: {
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    paddingHorizontal: 10,
  },
  defaultImage: {
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    flex: 1,
    rowGap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#03df6c",
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
