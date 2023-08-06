import { View, Text, Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingsButton from "../components/editGymComponents/SettingsButton";
import { setGym, setSpraywalls } from "../redux/actions";
import { request } from "../api/requestMethods";
import Header from "../components/general/Header";

const EditGymScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { spraywalls } = useSelector((state) => state.spraywallReducer);
  const { gym } = useSelector((state) => state.gymReducer);

  const handleEditItemPressed = (item) => {
    navigation.navigate("Edit", { item });
  };

  const GYM_DATA = [
    {
      id: 1,
      title: "Gym Type",
    },
    {
      id: 2,
      title: "Gym Name",
    },
    {
      id: 3,
      title: "Gym Location",
    },
  ];

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
            const response = await request("delete", `delete_gym/${gym.id}`);
            if (response.status !== 200) {
              console.log(response.status);
              return;
            }
            navigation.navigate("Map");
            dispatch(setGym({}));
            dispatch(setSpraywalls([]));
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
      }}
    >
      <Header navigation={navigation} title={"Gym Settings"} />
      {/* gym settings */}
      <View style={{ paddingHorizontal: 10 }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 10,
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 14 }}>Gym</Text>
        </View>
        <View style={{ backgroundColor: "white", borderRadius: 5 }}>
          {GYM_DATA.map((item) => (
            <SettingsButton
              key={item.id}
              title={item.title}
              onPress={() => handleEditItemPressed(item)}
            />
          ))}
        </View>
        {/* spray wall settings */}
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
          {spraywalls.map((item, index) => (
            <SettingsButton
              key={item.id}
              title={item.name}
              onPress={() =>
                navigation.navigate("EditSprayWall", { index: index })
              }
            />
          ))}
          <View
            style={{
              borderRadius: 5,
              borderWidth: 1,
            }}
          >
            <SettingsButton
              title={"Add New Spray Wall"}
              onPress={() => navigation.navigate("AddNewSprayWall")}
            />
          </View>
        </View>
        {/* delete gym */}
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
    </View>
  );
};

export default EditGymScreen;
