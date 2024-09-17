import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { GOOGLE_MAPS_GEOCODER_API_KEY } from "@env";
import axios from "axios";
import { colors } from "../../utils/styles";

const AddressTextInput = ({
  address,
  setAddress,
  suggestions,
  setSuggestions,
  placeholder,
  setPlaceID,
}) => {
  const fetchSuggestions = async (text) => {
    if (text.length < 3) return; // Avoid API call if input is too short

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input: text,
            key: GOOGLE_MAPS_GEOCODER_API_KEY,
            language: "en", // Optional: Set language for results
          },
        }
      );
      if (response.data.status === "OK") {
        setSuggestions(response.data.predictions); // Set the autocomplete results
      } else {
        setSuggestions([]); // Clear if no results
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    console.log("Selected Place ID:", suggestion.place_id);
    console.log("Selected Description:", suggestion.description);
    setPlaceID(suggestion.place_id);
    setAddress(suggestion.description); // Set selected suggestion address in input
    setSuggestions([]); // Clear suggestions
  };

  const renderAddressSuggestion = ({ item }) => (
    <TouchableOpacity
      style={{
        padding: 15,
        backgroundColor: colors.primaryLight,
      }}
      onPress={() => handleSelectSuggestion(item)}
    >
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 16,
        }}
        placeholder={placeholder}
        value={address}
        onChangeText={(text) => {
          setAddress(text);
          fetchSuggestions(text);
        }}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={renderAddressSuggestion}
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      />
    </View>
  );
};

export default AddressTextInput;
