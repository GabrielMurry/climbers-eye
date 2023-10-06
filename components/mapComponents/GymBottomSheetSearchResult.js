import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import GymCard from "../GymCard";
import { useCallback } from "react";

const GymBottomSheetSearchResult = ({
  navigation,
  gyms,
  handleGymCardPress,
}) => {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => handleGymCardPress(item)}>
        <GymCard gym={item} />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={styles.bottomSheetAddGymContainer}>
        <Text>Don't see your gym or home wall?</Text>
        <TouchableOpacity
          style={styles.bottomSheetAddGymButton}
          onPress={() => navigation.navigate("AddGym")}
        >
          <PlusIcon size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "lightgray", height: 1 }} />
      <BottomSheetFlatList
        data={gyms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default GymBottomSheetSearchResult;

const styles = StyleSheet.create({
  bottomSheetAddGymContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 10,
    marginLeft: 20,
    paddingBottom: 10,
  },
  bottomSheetAddGymButton: {
    backgroundColor: "black",
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
