import { View, TouchableOpacity, Keyboard, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { TextInput } from "react-native";
import { colors } from "../../utils/styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFilters } from "../../redux/features/filter/filterSelectors";
import { setSearch } from "../../redux/features/filter/filterSlice";
import { debounce } from "lodash";
import { debounce_speed } from "../../utils/constants/debounce";

const SearchInput = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => selectFilters(state));

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [searchText, setSearchText] = useState(filters.search);

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
    dispatch(setSearch(""));
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    }
  };

  const dispatchText = (value: string) => {
    dispatch(setSearch(value));
  };

  const searchDebouncer = useCallback(
    debounce(dispatchText, debounce_speed.MEDIUM),
    []
  );

  const handleOnChangeText = (value: string) => {
    setSearchText(value);
    searchDebouncer(value);
  };

  return (
    <View style={styles.SearchInputContainer}>
      <MagnifyingGlassIcon size={20} color="gray" />
      <TextInput
        style={styles.SearchInput}
        value={searchText}
        onChangeText={handleOnChangeText}
        placeholder="Search (name, setter, or grade)"
        autoComplete="off"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  SearchInputContainer: {
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.textInputLight,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  SearchInput: {
    flex: 1,
    paddingHorizontal: 5,
    // backgroundColor: colors.textInputBG,
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

export default SearchInput;
