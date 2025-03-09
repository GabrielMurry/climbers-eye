import {
  View,
  TextInput,
  StyleSheet,
  DimensionValue,
  Text,
} from "react-native";
import React from "react";
import Title from "./Title";
import { styles } from "./styles";

type CustomTextInputProps = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  title?: string;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  error = false,
  bordered,
  rounded,
  title,
}) => {
  return (
    <View style={styles.container}>
      <Title title={title} />
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

export default CustomTextInput;
