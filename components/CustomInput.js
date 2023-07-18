import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  width = "100%",
}) => {
  return (
    <View style={[styles.container, { width: width }]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    padding: 10,
    marginVertical: 5,
    justifyContent: "center",
  },
  input: {},
});
