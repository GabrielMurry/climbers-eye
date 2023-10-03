import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";

const EditData = ({
  text = null,
  setText = null,
  description,
  charLimit = null,
}) => {
  return (
    <View style={{ gap: 10 }}>
      {text !== null && (
        <>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              fontSize: 16,
            }}
            maxLength={charLimit}
            placeholder={text}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Text style={{ color: "gray" }}>
            {text?.length ? text.length : 0}/{charLimit}
          </Text>
        </>
      )}
      <Text style={{ color: "gray" }}>{description}</Text>
    </View>
  );
};

export default EditData;
