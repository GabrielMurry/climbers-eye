import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../components/Carousel";
import { setSpraywallIndex } from "../redux/actions";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  const handleSwitchWall = (interval) => {
    dispatch(setSpraywallIndex(interval - 1));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ paddingHorizontal: 5, flex: 1 }}>
        <View style={styles.titleContainer}>
          {/* Titles */}
          <Text style={styles.titleText}>{gym.name}</Text>
          <Text style={styles.subTitleText}>
            {spraywalls[spraywallIndex].name}
          </Text>
        </View>
        {/* Spray Wall Image(s) */}
        <Carousel
          style="slides"
          itemsPerInterval={1}
          items={spraywalls}
          itemInterval={handleSwitchWall}
        />
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
            onPress={() => navigation.navigate("EditGym")}
          >
            <Text style={styles.buttonText}>Edit Gym</Text>
          </TouchableOpacity>
        </View>
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
