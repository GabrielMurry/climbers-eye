import { View, Text } from "react-native";
import React from "react";

const InfoRow4 = ({ boulder }) => {
  return (
    <>
      {boulder.description ? (
        <View
          style={{
            height: 50,
            paddingHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "black" }}>{boulder.description}</Text>
        </View>
      ) : null}
    </>
  );
};

export default InfoRow4;
