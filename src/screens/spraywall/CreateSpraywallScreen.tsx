import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../utils/styles";
import { createSpraywall } from "../../services/spraywall";
import { appendSpraywall } from "../../redux/features/spraywall/spraywallSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpraywallStackParamList } from "../../navigation/SpraywallStack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { createImageFormData } from "../../utils/formData";
import { useNavigation } from "@react-navigation/native";
import CreateSpraywallHeader from "../../components/spraywall/CreateSpraywallHeader";
import CustomInput from "../../components/custom/CustomInput";
import CustomButton from "../../components/custom/CustomButton";
import { useCameraContext } from "../../contexts/CameraContext";
import { Image } from "expo-image";

type CreateSpraywallScreenProps = NativeStackScreenProps<
  SpraywallStackParamList,
  "CreateSpraywall"
>;

const CreateSpraywallScreen: React.FC<CreateSpraywallScreenProps> = () => {
  const navigation = useNavigation();

  const { image, openCamera, closeCamera } = useCameraContext();

  const dispatch = useAppDispatch();

  const gym = useAppSelector((state) => selectGym(state));

  const [spraywallName, setSpraywallName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (sprayWallName && image) {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [sprayWallName, image]);

  // const handleAddNewSprayWall = async () => {
  //   setIsLoading(true);

  //   const formData = new FormData();
  //   await createImageFormData(formData, image.url, "photo");
  //   formData.append("name", sprayWallName);
  //   formData.append("gym", gym.id.toString());
  //   formData.append("width", image.width.toString());
  //   formData.append("height", image.height.toString());

  //   const pathParams = { gymId: gym.id };
  //   const response = await createSpraywall(pathParams, formData);
  //   if (response.status === 201) {
  //     console.log(response.data);
  //     dispatch(appendSpraywall(response.data));
  //     setIsLoading(false);
  //     navigation.navigate("TabsStack", {
  //       screen: "HomeStack",
  //       params: { screen: "HomeList" },
  //     });
  //   } else {
  //     console.log(response.status);
  //   }
  //   setIsLoading(false);
  // };

  const handleCreateSpraywall = async () => {
    //     setIsLoading(true);
    // const formData = new FormData();
    // await createImageFormData(formData, image.url, "photo");
    // formData.append("name", sprayWallName);
    // formData.append("gym", gym.id.toString());
    // formData.append("width", image.width.toString());
    // formData.append("height", image.height.toString());
    // const pathParams = { gymId: gym.id };
    // const response = await createSpraywall(pathParams, formData);
    // if (response.status === 201) {
    //   console.log(response.data);
    //   dispatch(appendSpraywall(response.data));
    //   setIsLoading(false);
    //   navigation.navigate("TabsStack", {
    //     screen: "HomeStack",
    //     params: { screen: "HomeList" },
    //   });
    // } else {
    //   console.log(response.status);
    // }
    // setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(245,245,245,255)" }}>
      <CreateSpraywallHeader />
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <CustomInput
          value={spraywallName}
          setValue={setSpraywallName}
          placeholder="Enter spray wall name"
          bordered={true}
          rounded={true}
          title="Spray Wall Name"
        />
        {image ? (
          <TouchableOpacity style={{ flex: 1 }} onPress={() => openCamera()}>
            <Image
              source={image.url}
              contentFit="contain"
              // onLoadStart={() => setIsLoading(true)}
              // onLoadEnd={() => setIsLoading(false)}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => openCamera()}>
            <Text>hello</Text>
          </TouchableOpacity>
        )}
        <CustomButton
          onPress={handleCreateSpraywall}
          text="Create"
          // disabled={isSubmitDisabled}
          bgColor={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateSpraywallScreen;

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
