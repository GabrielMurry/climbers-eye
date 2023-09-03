import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  width = "100%",
  error = false,
  autoCapitalize = "sentences",
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={[styles.input(error), { width: width }]}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: (error) => ({
    backgroundColor: "white",
    borderColor: error ? "red" : "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    padding: 10,
    justifyContent: "center",
  }),
});
