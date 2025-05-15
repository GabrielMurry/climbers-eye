import { View, Text } from "react-native";
import React from "react";
import QualityRating from "../../boulder/QualityRating";
import { Boulder } from "../../../utils/types/boulder";

type DetailsProps = {
  boulder: Boulder;
};

const Details: React.FC<DetailsProps> = ({ boulder }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>{boulder.name}</Text>
        <Text style={{ fontSize: 16 }}>{boulder.setter}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          {boulder.grade ? boulder.grade : "Project"}
        </Text>
        <QualityRating quality={boulder.quality} size={18} />
      </View>
    </View>
  );
};

export default Details;
