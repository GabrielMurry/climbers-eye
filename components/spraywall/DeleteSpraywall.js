import { View, Text, Alert } from "react-native";
import React from "react";
import SettingsButton from "../custom/SettingsButton";
import { request } from "../../api/requestMethods";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteSpraywall } from "../../redux/actions";

const DeleteSpraywall = ({ navigation, spraywall }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert(
      "Delete Gym",
      `Are you sure you want to delete "${spraywall.name}"?`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const response = await request(
              "delete",
              `api/spraywall/${spraywall.id}`
            );
            if (response.status === 204) {
              navigation.goBack();
              dispatch(deleteSpraywall(spraywall.id));
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14, color: "red" }}>Delete</Text>
      </View>
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 5,
        }}
      >
        <SettingsButton
          title={"Delete Spray Wall"}
          textColor={"white"}
          destructive={true}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

export default DeleteSpraywall;
