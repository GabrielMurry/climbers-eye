import { View, Text, Alert } from "react-native";
import React from "react";
import SettingsButton from "../custom/SettingsButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteGym } from "../../services/gym";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";

const DeleteGym = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);

  const handleDelete = () => {
    Alert.alert(
      "Delete Gym",
      `Are you sure you want to delete "${gym.name}"?`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const pathParams = { gymId: gym.id };
            const response = await deleteGym(pathParams);
            if (response.status === 204) {
              navigation.navigate("Tabs", { screen: "Map" });
              dispatch(setGym({}));
              dispatch(setSpraywalls([]));
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
          title={"Delete Gym"}
          textColor={"white"}
          destructive={true}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

export default DeleteGym;
