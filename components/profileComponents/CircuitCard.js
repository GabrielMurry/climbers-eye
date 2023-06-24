import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import BoulderCard from "../listComponents/BoulderCard";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";

const CircuitCard = ({ circuit }) => {
  const [isOpen, updateDrop] = useState(false);
  return (
    <View>
      {!isOpen && (
        <Pressable
          style={styles.closedContainer}
          onPress={() => updateDrop((prev) => !prev)}
        >
          <View style={styles.headerLeft}>
            <View style={styles.color(circuit.color)} />
            <Text>{circuit.name}</Text>
          </View>
          <ChevronLeftIcon size={15} color={"black"} />
        </Pressable>
      )}
      {isOpen && (
        <Pressable
          style={styles.openContainer}
          onPress={() => updateDrop((prev) => !prev)}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
              <View style={styles.color(circuit.color)} />
              <Text>{circuit.name}</Text>
            </View>
            <ChevronDownIcon size={15} color={"black"} />
          </View>
          <View style={styles.contentContainer}>
            {circuit.boulderData.length > 0 ? (
              circuit.boulderData.map((boulder) => (
                <TouchableOpacity key={boulder.id}>
                  <BoulderCard boulder={boulder} />
                </TouchableOpacity>
              ))
            ) : (
              <Text>No Boulders</Text>
            )}
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default CircuitCard;

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
