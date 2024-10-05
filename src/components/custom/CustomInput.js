import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  width = "100%",
  error = false,
  autoCapitalize = "sentences",
  bgColor = "white",
  icon = null,
  button = null,
  bordered = null,
  rounded = null,
}) => {
  return (
    <View
      style={{
        width: width,
        flexDirection: "row",
        borderColor: error ? "red" : "#e8e8e8",
        borderBottomWidth: bordered ? null : 2,
        borderWidth: bordered ? 1 : null,
        alignItems: "center",
        borderRadius: rounded ? 5 : null,
      }}
    >
      {icon}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input(error, bgColor)}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
      {button}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: (error, bgColor) => ({
    backgroundColor: bgColor,
    height: 50,
    padding: 5,
    justifyContent: "center",
    flex: 1,
  }),
});
