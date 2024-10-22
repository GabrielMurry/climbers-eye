import { View, Text, Alert } from "react-native";
import React from "react";
import SettingsButton from "../custom/SettingsButton";
import { useDispatch } from "react-redux";
import { deleteSpraywallAPI } from "../../services/spraywall";
import {
  deleteSpraywall,
  resetSpraywallIndex,
} from "../../redux/features/spraywall/spraywallSlice";
import { useFetch } from "../../hooks/useFetch";

const DeleteSpraywall = ({ navigation, spraywall }) => {
  const dispatch = useDispatch();

  const [fetchDelete, isLoadingDelete, isErrorDelete] =
    useFetch(deleteSpraywallAPI);

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
            const pathParams = { spraywallId: spraywall.id };
            const response = await fetchDelete({ pathParams });
            if (response.status === 204) {
              navigation.goBack();
              dispatch(deleteSpraywall(spraywall.id));
              dispatch(resetSpraywallIndex());
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
