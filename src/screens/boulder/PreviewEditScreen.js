import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import { useDispatch } from "react-redux";
import { addBoulderToSpraywall } from "../../services/boulder";
import { addNewBoulder } from "../../redux/features/boulder/boulderSlice";
import { appendExcludeId } from "../../redux/features/filter/filterSlice";
import FullScreenImage from "../../components/image/FullScreenImage";
import useCustomHeader from "../../hooks/useCustomHeader";
import PreviewInputData from "../../components/boulder/preview/PreviewInputData";
import PreviewImage from "../../components/boulder/preview/PreviewImage";
import PreviewPublishButtons from "../../components/boulder/preview/PreviewPublishButtons";
import { useFetch } from "../../hooks/useFetch";

const TAGS = [
  { name: "crimp", selected: false },
  { name: "pinch", selected: false },
  { name: "endurance", selected: false },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHRINK_SCALE = 0.3;

const PreviewEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );

  const { image, resultImageUri } = route.params;

  const [fetchAddBoulder, isLoadingAddBoulder, isErrorAddBoulder] = useFetch(
    addBoulderToSpraywall
  );

  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [isFeetFollowHands, setIsFeetFollowHands] = useState(true);
  const [isKickboardOn, setIsKickboardOn] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [error, setError] = useState(false);

  useCustomHeader({
    navigation,
    title: "Preview",
  });

  const handleConfirm = async ({ publish }) => {
    data = {
      name,
      description,
      publish,
      matching: isMatching,
      feetFollowHands: isFeetFollowHands,
      kickboardOn: isKickboardOn,
      url: resultImageUri.split(",")[1], // using the default image has complete base64 as image.uri --> remove the 'data:image/png;base64' in the beginning of string
      width: image.width,
      height: image.height,
      setter: user.id,
      spraywall: spraywalls[spraywallIndex].id,
    };
    const pathParams = { spraywallId: spraywalls[spraywallIndex].id };
    const response = await fetchAddBoulder({ pathParams, data });
    if (response) {
      dispatch(addNewBoulder(response.data));
      handleVibrate();
      navigation.replace("Tabs", {
        screen: "Home", // Target the 'Home' stack within 'Tabs'
        params: {
          screen: "Boulder", // Target the 'Boulder' screen inside the 'Home' stack
          params: {
            boulderId: response.data.id,
          },
        },
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
        resultImageUri={resultImageUri}
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
        isLoading={isLoadingAddBoulder}
      />
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={resultImageUri}
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
