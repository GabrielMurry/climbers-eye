import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import useCustomHeader from "../hooks/useCustomHeader";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { request } from "../api/requestMethods";

const BoulderUserSendsScreen = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { boulder } = route.params;
  useCustomHeader({
    navigation,
    title: "Your Sends",
  });

  const [data, setData] = useState(boulder.userSendsData);

  const fetchUpdatedBoulderData = async () => {
    const response = await request(
      "get",
      `updated_boulder_data/${boulder.id}/${user.id}`
    );
    if (response.status !== 200) {
      console.log(response.status);
    }
    if (response.data) {
      setData(response.data.userSendsData);
    }
  };

  const renderUserSend = ({ item }) => {
    const onDelete = () => {
      Alert.alert(
        "Delete Logged Ascent",
        `Are you sure you want to delete logged ascent from ${item.date}?`,
        [
          {
            text: "Cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const response = await request(
                "delete",
                `delete_logged_ascent/${item.id}`
              );
              if (response.status !== 200) {
                console.log(response.status);
                return;
              }
              fetchUpdatedBoulderData();
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    };
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "lightgray",
          paddingVertical: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>{item.date}</Text>
          <Text>Attempts: {item.attempts}</Text>
          <Text>Grade Proposed: {item.grade}</Text>
          <Text>Quality: {item.quality}</Text>
          <Text>Notes: {item.notes}</Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 5,
            marginRight: 10,
          }}
          onPress={onDelete}
        >
          <XMarkIcon size={20} color={"black"} />
        </TouchableOpacity>
      </View>
    );
  };

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
