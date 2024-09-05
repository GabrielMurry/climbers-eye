import { View, Text, Alert } from "react-native";
import React from "react";
import SettingsButton from "../SettingsButton";
import { request } from "../../api/requestMethods";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setGym, setSpraywalls } from "../../redux/actions";

const DeleteGym = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);

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
            const response = await request("delete", `api/gym/${gym.id}`);
            if (response.status === 204) {
              navigation.navigate("Map");
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
