import { View, Text } from "react-native";
import React from "react";
import { Boulder } from "../../../utils/types/boulder";

type InfoRow4Props = {
  boulder: Boulder;
};

const InfoRow4: React.FC<InfoRow4Props> = ({ boulder }) => {
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
