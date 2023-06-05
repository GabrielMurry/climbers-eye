import { StyleSheet, Text, View } from "react-native";

const GymBottomSheetSearchEmpty = () => (
  <View style={styles.bottomSheetBlank}>
    <Text style={{ color: "gray" }}>Search Gyms or Home Walls</Text>
  </View>
);

export default GymBottomSheetSearchEmpty;

const styles = StyleSheet.create({
  bottomSheetBlank: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});
