import { View, Text } from "react-native";
import React from "react";

const SessionTitle = ({ item, index, boulders }) => {
  return (
    <>
      {item.session?.num &&
      (index == 1 || item.session.num !== boulders[index - 1].session.num) ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            marginBottom: 10,
            marginTop: 20,
            padding: 5,
            backgroundColor: "rgba(245, 245, 245, 255)",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            Session {item.session.num}
          </Text>
          <Text> - {item.session.date}</Text>
        </View>
      ) : null}
    </>
  );
};

export default SessionTitle;
