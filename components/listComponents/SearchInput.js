import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { TextInput } from "react-native";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Add an event listener to detect changes in keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    // Clean up the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCancelSearchPress = () => {
    setSearchQuery("");
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.SearchInputContainer}>
      <MagnifyingGlassIcon size={20} color="gray" />
      <TextInput
        style={styles.SearchInput}
        value={searchQuery}
        // onChange doesn't exist in react native. use onChangeText
        onChangeText={(value) => setSearchQuery(value)} // in react native, you don't have to do e.target.value
        placeholder="Search (name, setter, or grade)"
        autoComplete="off"
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
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  SearchInputContainer: {
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(229, 228, 226)",
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  SearchInput: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "rgb(229, 228, 226)",
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  resetSearchQuery: {
    backgroundColor: "gray",
    width: 16,
    height: 16,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
