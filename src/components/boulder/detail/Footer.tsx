import { View, Text } from "react-native";
import React from "react";
import InfoRow6 from "./InfoRow6";
import { Boulder } from "../../../utils/types/boulder";

type FooterProps = {
  boulder: Boulder;
};

const Footer: React.FC<FooterProps> = ({ boulder }) => {
  return (
    <>
      {/* Tags? */}
      <InfoRow6 boulder={boulder} />
      {/* separator line */}
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "lightgray",
            marginTop: 20,
          }}
        />
      </View>
    </>
  );
};

export default Footer;
