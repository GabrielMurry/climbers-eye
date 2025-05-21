import { Text, TextInput, View } from "react-native";
import React, { RefAttributes, RefObject, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

type InputBehavior = "email";

type CommonTextInputProps = {
  behavior?: InputBehavior;
  value: string;
  setValue: (val: string) => void;
  title?: string;
  error?: string | null;
  inputRef?: RefObject<TextInput>;
};

const CommonTextInput: React.FC<CommonTextInputProps> = ({
  value,
  setValue,
  title,
  error,
  behavior,
  inputRef,
}) => {
  return (
    <View style={{ gap: 5 }}>
      {title && <Text style={{ fontWeight: "500" }}>{title}</Text>}
      <TextInput
        value={value}
        onChangeText={(val) => setValue(val)}
        style={{
          width: "100%",
          borderWidth: 2,
          height: 50,
          borderRadius: 10,
          borderColor: error ? "red" : "gray",
          paddingLeft: 20,
        }}
        keyboardType={behavior === "email" ? "email-address" : undefined}
        autoComplete={behavior === "email" ? "email" : undefined}
        textContentType={behavior === "email" ? "emailAddress" : undefined}
        autoCapitalize={behavior === "email" ? "none" : undefined}
        ref={inputRef}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

export default CommonTextInput;
