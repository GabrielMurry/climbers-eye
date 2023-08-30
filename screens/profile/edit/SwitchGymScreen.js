import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useCustomHeader from "../../../hooks/useCustomHeader";
import GymCard from "../../../components/profileComponents/GymCard";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { request } from "../../../api/requestMethods";

const SwitchGymScreen = ({ navigation }) => {
  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Switch Gym",
  });

  const { user } = useSelector((state) => state.userReducer);

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

  const renderCards = ({ item }) => {
    return <GymCard gymCard={item} />;
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => console.log(item.id)}
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
        }}
      >
        <Text>{item.name}</Text>
        <Text>{item.location}</Text>
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
        gap: 20,
      }}
    >
      <View style={{ gap: 10 }}>
        <Text>Current Gym</Text>
        <View
          style={{ height: 50, backgroundColor: "white", borderRadius: 10 }}
        ></View>
      </View>
      <View style={{ gap: 10 }}>
        <Text>My Gyms</Text>
        {/* {data.map((gym, index) => (
          <View
            key={gym.id}
            style={{
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <View style={{ height: "100%", flex: 1, backgroundColor: "blue" }}>
              <Text>{gym.name}</Text>
              <Text>{gym.location}</Text>
            </View>
          </View>
        ))} */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default SwitchGymScreen;
