import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import QualityRating from "../QualityRating";
import { XMarkIcon } from "react-native-heroicons/outline";
import { deleteSendFromBoulder } from "../../../services/send";
import { useNavigation } from "@react-navigation/native";
import { UserSendsData } from "../../../screens/boulder/types";

type UserSendCardProps = {
  sentBoulder: UserSendsData;
};

const UserSendCard: React.FC<UserSendCardProps> = ({ sentBoulder }) => {
  const navigation = useNavigation();

  const onDelete = () => {
    Alert.alert(
      "Delete Logged Ascent",
      `Are you sure you want to delete logged ascent from ${sentBoulder.date}?`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const pathParams = { sendId: sentBoulder.id };
            const response = await deleteSendFromBoulder(pathParams);
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
        <Text style={{ fontWeight: "bold" }}>{sentBoulder.date}</Text>
        <Text>Attempts: {sentBoulder.attempts}</Text>
        <Text>Grade Proposed: {sentBoulder.grade}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text>Quality:</Text>
          <QualityRating quality={sentBoulder.quality} size={12} />
        </View>
        <Text>Notes: {sentBoulder.notes}</Text>
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

export default UserSendCard;
