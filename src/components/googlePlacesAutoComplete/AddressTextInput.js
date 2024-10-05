import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { colors } from "../../utils/styles";
import { getAddressSuggestions } from "../../services/googleMapsAPI/placeAutocomplete";

const AddressTextInput = ({
  address,
  setAddress,
  suggestions,
  setSuggestions,
  placeholder,
  setPlaceID,
  charLimit = null,
  description = null,
}) => {
  const fetchSuggestions = async (text) => {
    setSuggestions(await getAddressSuggestions(text));
  };

  const handleSelectSuggestion = (suggestion) => {
    console.log("Selected Place ID:", suggestion.place_id);
    console.log("Selected Description:", suggestion.description);
    console.log(suggestion);
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
      {charLimit ? (
        <Text style={{ color: "gray", paddingTop: 10 }}>
          {address?.length ? address.length : 0}/{charLimit}
        </Text>
      ) : null}
      {description ? (
        <Text style={{ color: "gray", paddingTop: 10 }}>{description}</Text>
      ) : null}
    </View>
  );
};

export default AddressTextInput;
