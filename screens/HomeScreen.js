import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.titleContainer}>
        {/* Titles */}
        <Text style={styles.titleText}>The Boulder Field</Text>
        <Text style={styles.subTitleText}>Spray Wall 1</Text>
      </View>
      {/* Default Image */}
      <View style={styles.defaultImageContainer}>
        <Image
          source={require("../assets/rockwall.jpg")}
          resizeMode="contain"
          style={styles.defaultImage}
        />
      </View>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("List")}
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
          onPress={() => navigation.navigate("AddBoulder")}
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
