import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

const MapSearchQuery = ({
  searchQuery,
  setSearchQuery,
  handleCancelSearchPress,
}) => {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  const handleTextInputFocus = () => {
    setIsTextInputFocused(true);
  };

  const handleTextInputBlur = () => {
    setIsTextInputFocused(false);
  };

  return (
    <View style={styles.bottomSheetSearchInputAndCancelContainer}>
      <View style={styles.bottomSheetSearchInputContainer}>
        <MagnifyingGlassIcon size={20} color="gray" />
        <BottomSheetTextInput
          style={styles.bottomSheetSearchInput}
          value={searchQuery}
          // onChange doesn't exist in react native. use onChangeText
          onChangeText={(value) => setSearchQuery(value)} // in react native, you don't have to do e.target.value
          placeholder="Search Gyms or Home Walls"
          onFocus={handleTextInputFocus}
          onBlur={handleTextInputBlur}
        />
        {searchQuery ? (
          <TouchableOpacity
            style={styles.resetSearchQuery}
            onPress={() => setSearchQuery("")}
          >
            <XMarkIcon size={12} color={"white"} />
          </TouchableOpacity>
        ) : null}
      </View>
      {(isTextInputFocused || searchQuery) && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelSearchPress}
        >
          <Text style={{ color: "rgb(0, 122, 255)" }}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MapSearchQuery;

const styles = StyleSheet.create({
  bottomSheetSearchInputAndCancelContainer: {
    flexDirection: "row",
  },
  bottomSheetSearchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(229, 228, 226)",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bottomSheetSearchInput: {
    flex: 1,
    height: 35,
    paddingHorizontal: 5,
    backgroundColor: "rgb(229, 228, 226)",
    borderRadius: 10,
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  resetSearchQuery: {
    backgroundColor: "gray",
    width: 18,
    height: 18,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
