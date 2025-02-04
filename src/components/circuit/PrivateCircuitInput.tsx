import { View, Text, Switch } from "react-native";
import React from "react";

type PrivateCircuitInputProps = {
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
};

const PrivateCircuitInput: React.FC<PrivateCircuitInputProps> = ({
  isPrivate,
  setIsPrivate,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 5,
      }}
    >
      <Text
        style={{
          fontSize: 16,
        }}
      >
        Private Circuit
      </Text>
      <Switch
        value={isPrivate}
        onValueChange={() => setIsPrivate(!isPrivate)}
      />
    </View>
  );
};

export default PrivateCircuitInput;
