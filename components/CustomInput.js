import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { UserIcon } from "react-native-heroicons/outline";

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
}) => {
  return (
    <View
      style={{
        width: width,
        flexDirection: "row",
        borderColor: error ? "red" : "#e8e8e8",
        borderBottomWidth: 2,
        alignItems: "center",
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
    // backgroundColor: bgColor,
    height: 50,
    padding: 5,
    justifyContent: "center",
    flex: 1,
  }),
});
