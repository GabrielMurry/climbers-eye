import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { request } from "../api/requestMethods";
import { useSelector, useDispatch } from "react-redux";
import {
  setGymName,
  setSpraywallName,
  setSpraywallID,
  setDefaultImageUri,
  setDefaultImageWidth,
  setDefaultImageHeight,
} from "../redux/actions";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userID } = useSelector((state) => state.userReducer);
  const { gymName } = useSelector((state) => state.gymReducer);
  const {
    spraywallName,
    defaultImageUri,
    defaultImageWidth,
    defaultImageHeight,
  } = useSelector((state) => state.spraywallReducer);

  const [isLoading, setIsLoading] = useState(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchDefaultData();
  //   }, [])
  // );

  // const fetchDefaultData = async () => {
  //   const response = await request("get", `home/${userID}`);
  //   if (response.status !== 200) {
  //     console.log(response.status);
  //     return;
  //   }
  //   if (response.data) {
  //     dispatch(setSpraywallName(response.data.spraywallName));
  //     dispatch(setSpraywallID(response.data.spraywallID));
  //     dispatch(setDefaultImageUri(response.data.imageUri));
  //     dispatch(setDefaultImageWidth(response.data.imageWidth));
  //     dispatch(setDefaultImageHeight(response.data.imageHeight));
  //   }
  // };

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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 375,
        }}
      >
        <View
          style={styles.defaultImageContainer(
            defaultImageWidth,
            defaultImageHeight
          )}
        >
          <Image
            source={{ uri: defaultImageUri }}
            resizeMode="contain"
            style={styles.defaultImage}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
          {isLoading && (
            <ActivityIndicator size="large" style={styles.defaultImage} />
          )}
        </View>
      </View>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("List")}
        >
          <Text style={styles.buttonText}>Find Boulders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("List")}
        >
          <Text style={styles.buttonText}>Find Routes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditGym")}
        >
          <Text style={styles.buttonText}>Edit Gym</Text>
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
    padding: 10,
  },
  titleText: {
    fontSize: 30,
  },
  subTitleText: {
    fontSize: 24,
  },
  defaultImageContainer: (defaultImageWidth, defaultImageHeight) => ({
    alignItems: "center",
    justifyContent: "center",
    width: defaultImageWidth ? defaultImageWidth / 11 : "",
    height: defaultImageHeight ? defaultImageHeight / 11 : "",
  }),
  defaultImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonsContainer: {
    flex: 1,
    rowGap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FFFBF1",
    borderWidth: 1,
    borderColor: "black",
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // adding shadow to button
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  buttonText: {
    fontWeight: "bold",
  },
});
