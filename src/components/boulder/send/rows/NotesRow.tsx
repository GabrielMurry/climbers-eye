import { View, Text, TextInput } from "react-native";
import React from "react";

type NotesRowProps = {
  value: string;
  setValue: (val: string) => void;
};

const NotesRow: React.FC<NotesRowProps> = ({ value, setValue }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          flex: 1,
          fontWeight: "bold",
          marginRight: 10,
          fontSize: 16,
          color: "#333",
        }}
      >
        Notes:
      </Text>
      <TextInput
        style={{
          flex: 2,
          height: 75,
          backgroundColor: "#fff",
          borderRadius: 5,
          borderColor: "lightgray",
          borderWidth: 1,
          padding: 10,
          fontSize: 16,
          color: "#555",
          textAlignVertical: "top",
        }}
        multiline={true}
        placeholder="Enter notes..."
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

export default NotesRow;
