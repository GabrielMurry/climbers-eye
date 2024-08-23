import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React from "react";
import useCustomHeader from "../hooks/useCustomHeader";
import { XMarkIcon } from "react-native-heroicons/outline";
import { request } from "../api/requestMethods";

const BoulderUserSendsScreen = ({ navigation, route }) => {
  const { userSendsData } = route.params;

  useCustomHeader({
    navigation,
    title: "Your Sends",
  });

  const renderUserSend = ({ item: send }) => {
    const onDelete = () => {
      Alert.alert(
        "Delete Logged Ascent",
        `Are you sure you want to delete logged ascent from ${send.date}?`,
        [
          {
            text: "Cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const response = await request(
                "delete",
                `api/send_detail/${send.id}`
              );
              // not a successful deletion status of 204
              if (response.status !== 204) {
                console.error(response.status);
                return;
              }
              navigation.goBack();
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
          <Text style={{ fontWeight: "bold" }}>{send.date}</Text>
          <Text>Attempts: {send.attempts}</Text>
          <Text>Grade Proposed: {send.grade}</Text>
          <Text>Quality: {send.quality}</Text>
          <Text>Notes: {send.notes}</Text>
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
        data={userSendsData}
        renderItem={renderUserSend}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BoulderUserSendsScreen;
