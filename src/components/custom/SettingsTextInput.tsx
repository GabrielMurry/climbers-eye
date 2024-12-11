import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";

type SettingsTextInputProps = {
  text: string;
  setText: (text: string) => void;
  description: string;
  charLimit: number;
};

const SettingsTextInput = (props: SettingsTextInputProps) => {
  return (
    <View style={{ gap: 10 }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 16,
        }}
        maxLength={props.charLimit}
        placeholder={props.text}
        value={props.text}
        onChangeText={(text) => props.setText(text)}
      />
      <Text style={{ color: "gray" }}>
        {props.text?.length ? props.text.length : 0}/{props.charLimit}
      </Text>
      <Text style={{ color: "gray" }}>{props.description}</Text>
    </View>
  );
};

export default SettingsTextInput;
