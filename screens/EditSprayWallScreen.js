import { View, Text, Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import SettingsButton from "../components/editGymComponents/SettingsButton";
import { useSelector, useDispatch } from "react-redux";
import { setSpraywalls, setSpraywallIndex } from "../redux/actions";
import { request } from "../api/requestMethods";
import useCustomHeader from "../hooks/useCustomHeader";

const EditSprayWallScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { spraywalls } = useSelector((state) => state.spraywallReducer);
  const index = route?.params?.index;

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: spraywalls[index].name,
  });

  const handleEditItemPressed = (item) => {
    navigation.navigate("Edit", { item });
  };

  const SPRAY_WALL_DATA = [
    {
      id: 1,
      title: "Spray Wall Name",
      spraywall: spraywalls[index],
    },
    {
      id: 2,
      title: "Spray Wall Image",
      spraywall: spraywalls[index],
    },
  ];

  const handleDelete = async () => {
    Alert.alert(
      "Delete Spray Wall",
      `Are you sure you want to delete "${spraywalls[index].name}"?`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const response = await request(
              "delete",
              `delete_spraywall/${spraywalls[index].id}`
            );
            if (response.status !== 200) {
              console.log(response.status);
              return;
            }
            navigation.goBack();
            dispatch(setSpraywallIndex(0));
            dispatch(setSpraywalls(response.data.spraywalls));
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
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>Spray Wall</Text>
      </View>
      <View style={{ backgroundColor: "white", borderRadius: 5 }}>
        {SPRAY_WALL_DATA.map((item) => (
          <SettingsButton
            key={item.id}
            title={item.title}
            onPress={() => handleEditItemPressed(item)}
          />
        ))}
      </View>
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
          textColor="white"
          destructive={true}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

export default EditSprayWallScreen;
