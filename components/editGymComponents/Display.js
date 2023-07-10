import {
  View,
  Text,
  Switch,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusIcon } from "react-native-heroicons/outline";
import { request } from "../../api/requestMethods";
import {
  setUser,
  setGym,
  setSpraywalls,
  setHeadshotImage,
  setBannerImage,
} from "../../redux/actions";

export const GymType = () => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [isCommercialGym, setIsCommercialGym] = useState(
    gym.type === "commercial"
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newType = isCommercialGym ? "commercial" : "home";
    if (newType !== gym.type) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isCommercialGym, gym.type]);

  const handleSave = async () => {
    setIsLoading(true);
    const newType = isCommercialGym ? "commercial" : "home";
    const data = { type: newType };
    const response = await request("post", `edit_gym/${gym.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setGym(response.data.gym));
      setIsLoading(false);
      console.log("success!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 10 }}>
        <Text>
          Choosing "Commerical Gym" requires an address of the gym. "Home Gym"
          remains private.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Commercial Gym
          </Text>
          <Switch
            value={isCommercialGym}
            onValueChange={() => setIsCommercialGym(!isCommercialGym)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Non-Commercial Gym (Home)
          </Text>
          <Switch
            value={!isCommercialGym}
            onValueChange={() => setIsCommercialGym(!isCommercialGym)}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, isDisabled && styles.disabledButton]}
          disabled={isDisabled}
          onPress={handleSave}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const GymName = () => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [newGymName, setNewGymName] = useState(gym.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newGymName !== gym.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newGymName, gym.name]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { name: newGymName };
    const response = await request("post", `edit_gym/${gym.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setGym(response.data.gym));
      setIsLoading(false);
      console.log("success!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 10 }}>
        <Text>Gym Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 16,
          }}
          value={newGymName}
          onChangeText={(text) => setNewGymName(text)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, isDisabled && styles.disabledButton]}
          disabled={isDisabled}
          onPress={handleSave}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const GymLocation = () => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const [newGymLocation, setNewGymLocation] = useState(gym.location);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newGymLocation !== gym.location) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newGymLocation, gym.location]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = { location: newGymLocation };
    const response = await request("post", `edit_gym/${gym.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setGym(response.data.gym));
      setIsLoading(false);
      console.log("success!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 10 }}>
        <Text>Gym Location (required for commercial gyms)</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 16,
          }}
          value={newGymLocation}
          onChangeText={(text) => setNewGymLocation(text)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, isDisabled && styles.disabledButton]}
          disabled={isDisabled}
          onPress={handleSave}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const SprayWalls = ({ navigation }) => {
  const { spraywalls } = useSelector((state) => state.spraywallReducer);

  const renderHeaderItem = () => (
    <TouchableOpacity
      style={{
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("AddNewSprayWall")}
    >
      <PlusIcon size={35} color={"black"} />
    </TouchableOpacity>
  );

  const renderSprayWallItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
      }}
      onPress={() => navigation.navigate("EditSprayWall", { spraywall: item })}
    >
      <Image
        source={{ uri: item.base64 }}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ alignItems: "center", height: "100%" }}>
      <FlatList
        data={spraywalls}
        renderItem={renderSprayWallItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeaderItem}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(0, 122, 255)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#888",
  },
});
