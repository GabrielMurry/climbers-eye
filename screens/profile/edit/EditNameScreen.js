import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../../api/requestMethods";
import { setUser } from "../../../redux/actions";
import { CheckIcon } from "react-native-heroicons/outline";

const CHAR_LIMIT = 30;

const EditNameScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [newName, setNewName] = useState(user?.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newName !== user?.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newName, user?.name]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Name
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "rgb(0,122, 255)",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity disabled={isDisabled} onPress={handleSavePress}>
          <Text
            style={{
              color: isDisabled ? "#CCC" : "rgb(0,122, 255)",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {isLoading ? <ActivityIndicator /> : "Save"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, newName, user?.name, isDisabled, isLoading]);

  const handleSavePress = async () => {
    setIsLoading(true);
    const data = {
      name: newName,
    };
    const response = await request("post", `edit_user_info/${user.id}`, data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setUser(response.data.user));
      setIsLoading(false);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <View style={{ padding: 10, gap: 10 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 16,
          }}
          maxLength={CHAR_LIMIT}
          placeholder={newName}
          value={newName}
          onChangeText={(text) => setNewName(text)}
        />
        <Text style={{ color: "gray" }}>
          {newName?.length ? newName.length : 0}/{CHAR_LIMIT}
        </Text>
        <Text style={{ color: "gray" }}>
          Nickname to be displayed to all users.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EditNameScreen;

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
