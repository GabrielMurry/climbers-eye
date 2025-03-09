import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { addBoulderToSpraywall } from "../../services/boulder/boulder";
import { addNewBoulder } from "../../redux/features/boulder/boulderSlice";
import { appendExcludeId } from "../../redux/features/filter/filterSlice";
import FullScreenImage from "../../components/image/FullScreenImage";
import PreviewInputData from "../../components/boulder/preview/PreviewInputData";
import PreviewImage from "../../components/boulder/preview/PreviewImage";
import PreviewPublishButtons from "../../components/boulder/preview/PreviewPublishButtons";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { useNavigation } from "@react-navigation/native";
import PreviewHeader from "../../components/boulder/preview/PreviewHeader";
import BoulderImage from "../../components/boulder/BoulderImage";

type PreviewEditScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "PreviewEdit"
>;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHRINK_SCALE = 0.3;

const PreviewEditScreen: React.FC<PreviewEditScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    return;
  }

  const user = useAppSelector((state) => selectUser(state));

  const { uri, width, height } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [isFeetFollowHands, setIsFeetFollowHands] = useState(true);
  const [isKickboardOn, setIsKickboardOn] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleConfirm = async (isPublish: boolean) => {
    const formData = new FormData();
    formData.append("image", {
      uri: uri,
      name: name,
      type: `image/png`,
    } as any);

    formData.append("name", name);
    formData.append("description", description);
    formData.append("publish", isPublish.toString());
    formData.append("matching", isMatching.toString());
    formData.append("feetFollowHands", isFeetFollowHands.toString());
    formData.append("kickboardOn", isKickboardOn.toString());
    formData.append("width", width.toString());
    formData.append("height", height.toString());
    formData.append("setter", user.id.toString());
    formData.append("spraywall", spraywall.id.toString());

    const pathParams = { spraywallId: spraywall.id };

    const response = await addBoulderToSpraywall(pathParams, formData);

    if (response) {
      dispatch(addNewBoulder(response.data));
      handleVibrate();
      navigation.navigate("TabsStack", {
        screen: "HomeStack",
        params: { screen: "Boulder", params: { boulderId: response.data.id } },
      });
      dispatch(appendExcludeId(response.data.id));
    } else {
      console.error("Failed to upload new boulder.");
    }
    // const data = {
    //   name,
    //   description,
    //   publish: isPublish,
    //   matching: isMatching,
    //   feetFollowHands: isFeetFollowHands,
    //   kickboardOn: isKickboardOn,
    //   url: image.uri.split(",")[1], // using the default image has complete base64 as image.uri --> remove the 'data:image/png;base64' in the beginning of string
    //   width: image.width,
    //   height: image.height,
    //   setter: user.id,
    //   spraywall: spraywall!.id,
    // };
    // const pathParams = { spraywallId: spraywall!.id };
    // const response = await addBoulderToSpraywall(pathParams, data);
    // if (response) {
    //   dispatch(addNewBoulder(response.data));
    //   handleVibrate();
    //   navigation.navigate("TabsStack", {
    //     screen: "HomeStack",
    //     params: { screen: "Boulder", params: { boulderId: response.data.id } },
    //   });
    //   dispatch(appendExcludeId(response.data.id));
    // } else {
    //   console.error("Failed to upload new boulder.");
    // }
  };

  const handleVibrate = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  useEffect(() => {
    if (error) {
      setError(false);
    }
  }, [name]);

  return (
    <SafeAreaView style={styles.container}>
      <PreviewHeader />
      <PreviewImage
        boulderUri={uri}
        spraywallUri={spraywall.url}
        width={width}
        height={height}
      />
      <PreviewInputData
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        isMatching={isMatching}
        setIsMatching={setIsMatching}
        isFeetFollowHands={isFeetFollowHands}
        setIsFeetFollowHands={setIsFeetFollowHands}
        isKickboardOn={isKickboardOn}
        setIsKickboardOn={setIsKickboardOn}
        error={error}
      />
      <PreviewPublishButtons
        handleConfirm={handleConfirm}
        isLoading={isImageLoading}
      />
      {/* <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={image.uri}
        width={image.width}
        height={image.height}
        onRequestClose={() => setImageFullScreen(false)}
      /> */}
    </SafeAreaView>
  );
};

export default PreviewEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
