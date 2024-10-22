import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { request } from "../../services/common/apiRequest";
import { CheckIcon } from "react-native-heroicons/outline";
// import { updateUserGym } from "../../utils/functions";

const SwitchGymScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Switch Gym",
  });

  const { user } = useSelector((state) => state.user);
  const { gym } = useSelector((state) => state.gym);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await request("get", `get_all_user_gyms/${user.id}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setData(response.data.all_gyms_data);
    }
  };

  const handleGymCardPress = (item) => {
    // Separating the gym and that gym's spraywalls for dispatch - Create a copy of the gym object without 'spraywalls' property
    const { spraywalls, ...gymWithoutSpraywalls } = item;
    // updateUserGym({
    //   gym: gymWithoutSpraywalls,
    //   spraywalls: spraywalls,
    //   user: user,
    //   dispatch: dispatch,
    // });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleGymCardPress(item)}
      style={{
        backgroundColor: "white",
        borderTopLeftRadius: index === 0 ? 10 : 0,
        borderTopRightRadius: index === 0 ? 10 : 0,
        borderBottomLeftRadius: index === data.length - 1 ? 10 : 0,
        borderBottomRightRadius: index === data.length - 1 ? 10 : 0,
      }}
    >
      <View
        style={{
          padding: 20,
          gap: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        {/* <Text>{item.location}</Text> */}
        {item.id === gym.id ? <CheckIcon size={17} color={"green"} /> : null}
      </View>
      {/* item separator */}
      {index !== data.length - 1 ? (
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View style={{ backgroundColor: "lightgray", height: 1 }} />
        </View>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <View style={{ gap: 10 }}>
        <Text>My Gyms</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ height: "100%" }}
        />
      </View>
    </View>
  );
};

export default SwitchGymScreen;
