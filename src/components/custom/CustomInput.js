import {
  View,
  TextInput,
  StyleSheet,
  DimensionValue,
  Text,
} from "react-native";
import React from "react";

type CustomInputProps = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  width?: DimensionValue;
  error?: boolean;
  bgColor?: string;
  bordered?: boolean;
  rounded?: boolean;
  title?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  width = "100%",
  error = false,
  bgColor = "white",
  bordered,
  rounded,
  title,
}) => {
  return (
    <View style={{ gap: 5, width: width }}>
      {title && (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={{
          width: "100%",
          borderWidth: bordered ? 1 : undefined,
          borderBottomWidth: bordered ? undefined : 2,
          borderColor: error ? "red" : "#ccc",
          borderRadius: rounded ? 5 : undefined,
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 16,
        }}
        secureTextEntry={secureTextEntry}
      />
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
