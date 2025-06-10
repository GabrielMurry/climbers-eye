import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { createSpraywall } from "../../services/spraywall";
import { appendSpraywall } from "../../redux/features/spraywall/spraywallSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpraywallStackParamList } from "../../navigation/SpraywallStack";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGym } from "../../redux/features/gym/gymSelectors";
import { useNavigation } from "@react-navigation/native";
import CreateSpraywallHeader from "../../components/spraywall/CreateSpraywallHeader";
import { useCameraContext } from "../../contexts/CameraContext";
import CustomImageInput from "../../components/common/CustomImageInput";
import * as FileSystem from "expo-file-system";
import CommonSubmitButton from "../../components/common/CommonSubmitButton";
import CommonTextInput from "../../components/common/CommonTextInput";

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
        <CommonTextInput
          setValue={setSpraywallName}
          value={spraywallName}
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
          <CommonSubmitButton onPress={handleCreateSpraywall} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateSpraywallScreen;
