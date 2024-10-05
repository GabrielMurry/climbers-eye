import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";

const GymCard = ({ gymCard }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);

  const handleGymCardPress = () => {
    // Create a copy of the gym object without 'spraywalls' property
    const { spraywalls, ...gymWithoutSpraywalls } = gymCard;
    dispatch(setGym(gymWithoutSpraywalls));
    dispatch(setSpraywalls(gymCard.spraywalls));
  };

  return (
    <View style={styles.openContainer}>
      <Pressable style={styles.headerContainer} onPress={handleGymCardPress}>
        <View style={styles.headerLeft}>
          <Text>{gymCard.name}</Text>
        </View>
        {gymCard.id === gym.id ? <CheckIcon size={20} color={"green"} /> : null}
      </Pressable>
      <View style={styles.contentContainer}>
        {gymCard.spraywalls.length > 0 ? (
          gymCard.spraywalls.map((spraywall) => (
            <Pressable
              key={spraywall.id}
              style={{
                height: 50,
                backgroundColor: "lightblue",
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
              }}
            >
              {/* <BoulderCard boulder={boulder} /> */}
              <Text>{spraywall.name}</Text>
              <Image
                source={{ uri: spraywall.url }}
                style={{ width: 45, height: 45, borderRadius: 10 }}
              />
            </Pressable>
          ))
        ) : (
          <Text>No Spray Walls</Text>
        )}
      </View>
    </View>
  );
};

export default GymCard;

const styles = StyleSheet.create({
  closedContainer: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    // adding shadow to circuit folder - closed
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  color: (color) => ({
    backgroundColor: color,
    width: 15,
    height: 15,
    borderRadius: "100%",
  }),
  headerContainer: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  openContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    // adding shadow to circuit folder - open
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  contentContainer: {
    gap: 10,
    padding: 10,
  },
});
