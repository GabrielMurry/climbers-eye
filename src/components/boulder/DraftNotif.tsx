import { View, Text } from "react-native";
import React from "react";
import { Boulder } from "../../utils/types/boulder";

type DraftNotifProps = {
  boulder: Boulder;
};

const DraftNotif: React.FC<DraftNotifProps> = ({ boulder }) => {
  return (
    <>
      {boulder.publish ? null : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ backgroundColor: "red", flex: 1, height: 1 }} />
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              paddingHorizontal: 10,
            }}
          >
            Draft
          </Text>
          <View style={{ backgroundColor: "red", flex: 1, height: 1 }} />
        </View>
      )}
    </>
  );
};

export default DraftNotif;
