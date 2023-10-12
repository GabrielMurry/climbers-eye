import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import useCustomHeader from "../hooks/useCustomHeader";

const BoulderUserSendsScreen = ({ navigation, route }) => {
  const { boulder } = route.params;
  useCustomHeader({
    navigation,
    title: "Your Sends",
  });

  const [data, setData] = useState(boulder.userSendsData);

  const renderUserSend = ({ item }) => (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "lightgray",
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{item.date}</Text>
      <Text>Attempts: {item.attempts}</Text>
      <Text>Grade Proposed: {item.grade}</Text>
      <Text>Quality: {item.quality}</Text>
      <Text>Notes: {item.notes}</Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <FlatList
        data={data}
        renderItem={renderUserSend}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BoulderUserSendsScreen;
