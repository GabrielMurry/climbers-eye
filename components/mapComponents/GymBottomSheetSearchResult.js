import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";

const GymBottomSheetSearchResult = ({ gyms, renderItem }) => (
  <>
    <View style={styles.bottomSheetAddGymContainer}>
      <Text>Don't see your gym or home wall?</Text>
      <TouchableOpacity
        style={styles.bottomSheetAddGymButton}
        onPress={() => navigation.navigate("AddGym")}
      >
        <PlusIcon size={20} color="white" />
      </TouchableOpacity>
    </View>
    <BottomSheetFlatList
      contentContainerStyle={{
        gap: 5,
        width: 350,
      }}
      data={gyms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </>
);

export default GymBottomSheetSearchResult;

const styles = StyleSheet.create({
  bottomSheetAddGymContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginLeft: 25,
    gap: 10,
  },
  bottomSheetAddGymButton: {
    backgroundColor: "blue",
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
