import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ChevronRightIcon, PlusIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import SettingsButton from "../components/editGymComponents/SettingsButton";

const EditGymScreen = ({ navigation }) => {
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );
  const { gym } = useSelector((state) => state.gymReducer);
  const [newGymName, setNewGymName] = useState(gym.name);
  const [newGymLocation, setNewGymLocation] = useState(gym.location);
  const [isCommercialGym, setIsCommercialGym] = useState(
    gym.type === "commercial"
  );

  const handleEditItemPressed = (item) => {
    navigation.navigate("Edit", { item });
  };

  const GYM_DATA = [
    {
      id: 1,
      title: "Gym Type",
      onPress: handleEditItemPressed,
    },
    {
      id: 2,
      title: "Gym Name",
      onPress: handleEditItemPressed,
    },
    {
      id: 3,
      title: "Gym Location",
      onPress: handleEditItemPressed,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 26 }}>Edit Gym</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>Gym</Text>
      </View>
      <View
        style={{ backgroundColor: "#FFFBF1", borderWidth: 1, borderRadius: 5 }}
      >
        {GYM_DATA.map((item) => (
          <SettingsButton
            key={item.id}
            title={item.title}
            onPress={() => item.onPress(item.title)}
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
        <Text style={{ fontSize: 14 }}>Spray Wall</Text>
      </View>
      <View style={{ gap: 10 }}>
        <View
          style={{
            backgroundColor: "#FFFBF1",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          {spraywalls.map((item) => (
            <SettingsButton
              key={item.id}
              title={item.name}
              onPress={() =>
                navigation.navigate("EditSprayWall", { spraywall: item })
              }
            />
          ))}
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#FFFBF1",
          }}
        >
          <SettingsButton
            title={"Add New Spray Wall"}
            onPress={() => navigation.navigate("AddNewSprayWall")}
          />
        </View>
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
          borderWidth: 1,
          borderColor: "red",
          borderRadius: 5,
        }}
      >
        <SettingsButton title={"Delete Gym"} />
      </View>
    </View>
  );
};

export default EditGymScreen;
