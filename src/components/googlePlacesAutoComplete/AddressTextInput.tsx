import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/styles";
import { getAddressSuggestions } from "../../services/googleMapsAPI/placeAutocomplete";
import { AddressTextInputProps, Suggestion } from "./types";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

const AddressTextInput = (props: AddressTextInputProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = async (text: string) => {
    setSuggestions(await getAddressSuggestions(text));
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    props.setPlaceID(suggestion.place_id);
    props.setAddress(suggestion.description); // Set selected suggestion address in input
    setSuggestions([]); // Clear suggestions
  };

  const renderAddressSuggestion = ({ item }: { item: Suggestion }) => (
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
    <View style={{ alignSelf: "stretch" }}>
      {props.title && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {props.title}
        </Text>
      )}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 16,
          opacity: props.opacity,
        }}
        placeholder={props.placeholder}
        value={props.address}
        onChangeText={(text) => {
          props.setAddress(text);
          fetchSuggestions(text);
        }}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={renderAddressSuggestion}
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      />
      <Text style={{ color: "gray", paddingTop: 10 }}>
        {props.address?.length ? props.address.length : 0}/{props.charLimit}
      </Text>
      <Text style={{ color: "gray", paddingTop: 10 }}>{props.description}</Text>
    </View>
  );
};

export default AddressTextInput;
