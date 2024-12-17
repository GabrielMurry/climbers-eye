import { View, TextInput, StyleSheet, DimensionValue } from "react-native";
import React from "react";

type CustomInputProps = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  width?: DimensionValue;
  error?: boolean;
  autoCapitalize?: string;
  bgColor?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  width = "100%",
  error = false,
  autoCapitalize = "sentences",
  bgColor = "white",
  // icon = null,
  // button = null,
  // bordered = null,
  // rounded = null,
}) => {
  return (
    <View
      style={{
        width: width,
        flexDirection: "row",
        borderColor: error ? "red" : "#e8e8e8",
        // borderBottomWidth: bordered ? null : 2,
        // borderWidth: bordered ? 1 : null,
        alignItems: "center",
        // borderRadius: rounded ? 5 : null,
      }}
    >
      {/* {icon} */}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[styles.input, { backgroundColor: bgColor }]}
        secureTextEntry={secureTextEntry}
        // autoCapitalize={autoCapitalize}
      />
      {/* {button} */}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 5,
    justifyContent: "center",
    flex: 1,
  },
});
