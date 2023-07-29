import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";

const GymCard = ({ gym, selectedWalls, setSelectedWalls }) => {
  const [isOpen, updateDrop] = useState(false);

  // Function to check if selectedWalls contains any gym.spraywalls IDs
  const containsSpraywallIds = () => {
    return gym.spraywalls.some((spraywall) =>
      selectedWalls.includes(spraywall.id)
    );
  };

  useEffect(() => {
    if (!containsSpraywallIds()) {
      updateDrop(false);
    } else {
      updateDrop(true);
    }
  }, [selectedWalls]);

  const handleWallCardPress = (spraywall_id) => {
    setSelectedWalls((prevSelectedGyms) => {
      const index = prevSelectedGyms.indexOf(spraywall_id);

      if (index === -1) {
        // Gym ID not found in the array, append it
        return [...prevSelectedGyms, spraywall_id];
      } else {
        // Gym ID found in the array, remove it
        const newGyms = [...prevSelectedGyms];
        newGyms.splice(index, 1);
        return newGyms;
      }
    });
  };

  const gymCardOpenPress = () => {
    // Extracting only the 'id' values from gym.spraywalls array
    const spraywallIds = gym.spraywalls.map((spraywall) => spraywall.id);

    // Using a Set to ensure unique 'id' values and converting it back to an array
    const uniqueSelectedWalls = [
      ...new Set([...selectedWalls, ...spraywallIds]),
    ];

    setSelectedWalls(uniqueSelectedWalls);
  };

  const gymCardClosePress = () => {
    // Extracting only the 'id' values from gym.spraywalls array
    const spraywallIds = gym.spraywalls.map((spraywall) => spraywall.id);

    // Filtering out the spraywallIds from selectedWalls array
    const updatedSelectedWalls = selectedWalls.filter(
      (wallId) => !spraywallIds.includes(wallId)
    );

    setSelectedWalls(updatedSelectedWalls);
  };

  return (
    <View>
      {!isOpen && (
        <Pressable style={styles.closedContainer} onPress={gymCardOpenPress}>
          <View style={styles.headerLeft}>
            <Text>{gym.name}</Text>
          </View>
        </Pressable>
      )}
      {isOpen && (
        <View style={styles.openContainer}>
          <Pressable style={styles.headerContainer} onPress={gymCardClosePress}>
            <View style={styles.headerLeft}>
              <Text>{gym.name}</Text>
            </View>
            <CheckIcon size={20} color={"green"} />
          </Pressable>
          <View style={styles.contentContainer}>
            {gym.spraywalls.length > 0 ? (
              gym.spraywalls.map((spraywall) => (
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
                  onPress={() => handleWallCardPress(spraywall.id)}
                >
                  {/* <BoulderCard boulder={boulder} /> */}
                  <Text>{spraywall.name}</Text>
                  {selectedWalls.includes(spraywall.id) ? (
                    <CheckIcon size={20} color={"green"} />
                  ) : null}
                </Pressable>
              ))
            ) : (
              <Text>No Spray Walls</Text>
            )}
          </View>
        </View>
      )}
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
