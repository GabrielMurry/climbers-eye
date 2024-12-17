import { StyleSheet, SafeAreaView, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { addBoulderToSpraywall } from "../../services/boulder/boulder";
import { addNewBoulder } from "../../redux/features/boulder/boulderSlice";
import { appendExcludeId } from "../../redux/features/filter/filterSlice";
import FullScreenImage from "../../components/image/FullScreenImage";
import useCustomHeader from "../../hooks/useCustomHeader";
import PreviewInputData from "../../components/boulder/preview/PreviewInputData";
import PreviewImage from "../../components/boulder/preview/PreviewImage";
import PreviewPublishButtons from "../../components/boulder/preview/PreviewPublishButtons";
import {
  selectSpraywall,
  selectSpraywalls,
} from "../../redux/features/spraywall/spraywallSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { useNavigation } from "@react-navigation/native";

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

  const spraywalls = useAppSelector((state) => selectSpraywalls(state));
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("Spraywall not found.");
    return <Text>Spraywall not found.</Text>;
  }
  const user = useAppSelector((state) => selectUser(state));

  const { image } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [isFeetFollowHands, setIsFeetFollowHands] = useState(true);
  const [isKickboardOn, setIsKickboardOn] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [error, setError] = useState(false);

  useCustomHeader({
    title: "Preview",
  });

  // export type RootStackParamList = {
  //   BoulderStack: undefined; // or specific params for BoulderStack
  //   Tabs: {
  //     screen: keyof TabsStackParamList; // Reference to Tabs stack
  //     params?: TabsStackParamList[keyof TabsStackParamList]; // Pass params specific to Tabs screens
  //   };
  // };

  // export type TabsStackParamList = {
  //   Home: {
  //     screen: "Boulder"; // Target the 'Boulder' screen in 'Home'
  //     params: {
  //       boulderId: number;
  //     };
  //   };
  // };

  const handleConfirm = async (isPublish: boolean) => {
    const data = {
      name,
      description,
      publish: isPublish,
      matching: isMatching,
      feetFollowHands: isFeetFollowHands,
      kickboardOn: isKickboardOn,
      url: image.uri.split(",")[1], // using the default image has complete base64 as image.uri --> remove the 'data:image/png;base64' in the beginning of string
      width: image.width,
      height: image.height,
      setter: user.id,
      spraywall: spraywall.id,
    };
    const pathParams = { spraywallId: spraywall.id };
    const response = await addBoulderToSpraywall(pathParams, data);
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
      <PreviewImage
        SCREEN_WIDTH={SCREEN_WIDTH}
        SCREEN_HEIGHT={SCREEN_HEIGHT}
        SHRINK_SCALE={SHRINK_SCALE}
        setImageFullScreen={setImageFullScreen}
        resultImageUri={image.uri}
        isImageLoading={isImageLoading}
        setIsImageLoading={setIsImageLoading}
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
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={image.uri}
        width={image.width}
        height={image.height}
        onRequestClose={() => setImageFullScreen(false)}
      />
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
