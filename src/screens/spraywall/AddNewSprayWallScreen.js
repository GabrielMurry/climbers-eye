import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCustomHeader from "../../hooks/useCustomHeader";
import { colors } from "../../utils/styles";
import { createSpraywall } from "../../services/spraywall";
import { appendSpraywall } from "../../redux/features/spraywall/spraywallSlice";

const AddNewSprayWallScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);
  const [sprayWallName, setSprayWallName] = useState("");
  const { image } = route.params;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    navigation,
    title: "Add New Spray Wall",
  });

  useEffect(() => {
    if (sprayWallName && image) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [sprayWallName, image]);

  const handleAddNewSprayWall = async () => {
    setIsLoading(true);
    const data = {
      name: sprayWallName,
      url: image.url.split(",")[1],
      width: image.width,
      height: image.height,
      gym: gym.id,
    };
    const pathParams = { gymId: gym.id };
    const response = await createSpraywall(pathParams, data);
    if (response.status === 201) {
      console.log(response.data);
      dispatch(appendSpraywall(response.data));
      setIsLoading(false);
      navigation.navigate("Tabs", { screen: "Home" });
    } else {
      console.log(response.status);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(245,245,245,255)" }}>
      <View style={styles.addNewSprayWallContainer}>
        <View style={styles.inputAndAddContainer}>
          <Text style={styles.label}>Spray Wall Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter spray wall name"
            value={sprayWallName}
            onChangeText={(text) => setSprayWallName(text)}
          />
        </View>
        <View style={styles.imageContainer}>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: image.url }}
              style={{
                flex: 1,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderRadius: 5,
            width: "100%",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleAddNewSprayWall}
          disabled={isDisabled}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              Add
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddNewSprayWallScreen;

const styles = StyleSheet.create({
  addNewSprayWallContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  imageButton: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButtonText: {
    fontSize: 16,
  },
  inputAndAddContainer: {
    alignSelf: "stretch",
  },
});
