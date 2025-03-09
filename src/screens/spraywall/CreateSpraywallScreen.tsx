import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/styles";
import { createSpraywall } from "../../services/spraywall";
import { appendSpraywall } from "../../redux/features/spraywall/spraywallSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpraywallStackParamList } from "../../navigation/SpraywallStack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { useNavigation } from "@react-navigation/native";
import CreateSpraywallHeader from "../../components/spraywall/CreateSpraywallHeader";
import CustomButton from "../../components/custom/CustomButton";
import { useCameraContext } from "../../contexts/CameraContext";
import CustomImageInput from "../../components/custom/inputs/CustomImageInput";
import CustomTextInput from "../../components/custom/inputs/CustomInput";
import * as FileSystem from "expo-file-system";

type CreateSpraywallScreenProps = NativeStackScreenProps<
  SpraywallStackParamList,
  "CreateSpraywall"
>;

const CreateSpraywallScreen: React.FC<CreateSpraywallScreenProps> = () => {
  const navigation = useNavigation();

  const { image, openCamera } = useCameraContext();

  const dispatch = useAppDispatch();

  const gym = useAppSelector((state) => selectGym(state));

  const [spraywallName, setSpraywallName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSpraywall = async () => {
    if (!image) return;

    setIsLoading(true);
    const imageUri = image.url;
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (!fileInfo.exists) {
      console.error("File does not exist");
      return;
    }

    const fileType = fileInfo.uri.split(".").pop(); // Get file extension

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: spraywallName,
      type: `image/${fileType}`,
    } as any);
    formData.append("width", image.width.toString());
    formData.append("height", image.height.toString());
    formData.append("name", spraywallName);
    formData.append("gym", gym.id.toString());
    const pathParams = { gymId: gym.id };
    const response = await createSpraywall(pathParams, formData);
    if (response.status === 201) {
      dispatch(appendSpraywall(response.data));
      setIsLoading(false);
      navigation.navigate("TabsStack", {
        screen: "HomeStack",
        params: { screen: "HomeList" },
      });
    } else {
      console.log(response.status);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(245,245,245,255)" }}>
      <CreateSpraywallHeader />
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
          gap: 10,
        }}
      >
        <CustomTextInput
          value={spraywallName}
          setValue={setSpraywallName}
          placeholder="Enter spray wall name"
          bordered={true}
          rounded={true}
          title="Spray Wall Name"
        />
        <CustomImageInput
          image={image}
          openCamera={openCamera}
          title="Spray Wall Image"
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            onPress={handleCreateSpraywall}
            text="Create"
            // disabled={isSubmitDisabled}
            bgColor={colors.primary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateSpraywallScreen;
