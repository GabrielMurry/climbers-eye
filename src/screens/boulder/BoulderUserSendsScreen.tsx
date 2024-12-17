import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import { XMarkIcon } from "react-native-heroicons/outline";
import QualityRating from "../../components/boulder/QualityRating";
import { deleteSendFromBoulder } from "../../services/send";
import { BoulderUserSendsScreenProps } from "../../navigation/BoulderStack";
import { UserSendsData } from "./types";

const BoulderUserSendsScreen: React.FC<BoulderUserSendsScreenProps> = ({
  navigation,
  route,
}) => {
  const { userSendsData } = route.params;

  useCustomHeader({
    title: "Your Sends",
  });

  const renderUserSend = ({ item }: { item: UserSendsData }) => {
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
              const pathParams = { sendId: item.id };
              const response = await deleteSendFromBoulder(pathParams);
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
          <Text style={{ fontWeight: "bold" }}>{item.date}</Text>
          <Text>Attempts: {item.attempts}</Text>
          <Text>Grade Proposed: {item.grade}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text>Quality:</Text>
            <QualityRating quality={item.quality} size={12} />
          </View>
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
        data={userSendsData}
        renderItem={renderUserSend}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default BoulderUserSendsScreen;
