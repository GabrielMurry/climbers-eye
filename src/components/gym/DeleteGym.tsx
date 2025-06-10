import { View, Text, Alert } from "react-native";
import React from "react";
import SettingsButton from "../common/settings/SettingsButton";
import { removeSpraywalls } from "../../redux/features/spraywall/spraywallSlice";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { deleteGymAPI } from "../../services/gym";
import { removeGym } from "../../redux/features/gym/gymSlice";

const DeleteGym = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const gym = useAppSelector((state) => selectGym(state));

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
            const response = await deleteGymAPI(pathParams);
            if (response.status === 204) {
              navigation.navigate("TabsStack", { screen: "MapStack" });
              dispatch(removeGym());
              dispatch(removeSpraywalls());
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
