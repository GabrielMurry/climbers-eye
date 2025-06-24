import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { addBoulderToSpraywall } from "../../services/boulder/boulder";
import PreviewInputData from "../../components/boulder/preview/PreviewInputData";
import PreviewImage from "../../components/boulder/preview/PreviewImage";
import PreviewPublishButtons from "../../components/boulder/preview/PreviewPublishButtons";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { StackActions, useNavigation } from "@react-navigation/native";
import PreviewHeader from "../../components/boulder/preview/PreviewHeader";
import { deleteLocalFile } from "../../utils/localFile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { padding } from "../../utils/styles";
import { addNewBoulder } from "../../redux/features/boulder/boulderSlice";

type PreviewEditScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "PreviewEdit"
>;

const PreviewEditScreen: React.FC<PreviewEditScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    return;
  }

  const user = useAppSelector((state) => selectUser(state));

  const { boulderImage, wallImage } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [isFeetFollowHands, setIsFeetFollowHands] = useState(true);
  const [isKickboardOn, setIsKickboardOn] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleConfirm = async (isPublish: boolean) => {
    const formData = new FormData();
    formData.append("boulderImage", {
      uri: boulderImage.uri,
      name: name,
      type: `image/png`,
    } as any);

    // If user is uploading an alternative angle to the default spray wall, add that alternative wall image to form data.
    if (wallImage.uri !== spraywall.url) {
      formData.append("altWallImage", {
        uri: wallImage.uri,
        name: `alt-${spraywall.name}`,
        type: `image/jpg`,
      } as any);
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("publish", isPublish.toString());
    formData.append("matching", isMatching.toString());
    formData.append("feetFollowHands", isFeetFollowHands.toString());
    formData.append("kickboardOn", isKickboardOn.toString());
    formData.append("width", boulderImage.width.toString());
    formData.append("height", boulderImage.height.toString());
    formData.append("setter", user.id.toString());
    formData.append("spraywall", spraywall.id.toString());

    const pathParams = { spraywallId: spraywall.id };

    const response = await addBoulderToSpraywall(pathParams, formData);

    if (response) {
      handleVibrate();
      navigation.dispatch(() => {
        // Before dispatching the navigation, we must add the new boulder to redux state then replace the current navigation stack
        dispatch(addNewBoulder(response.data));
        return StackActions.replace("BoulderStack", {
          screen: "Boulder",
          params: { boulder: response.data },
        });
      });
      await deleteLocalFile(boulderImage.uri);
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
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}
    >
      <PreviewHeader />
      <PreviewImage
        boulderUri={boulderImage.uri}
        spraywallUri={wallImage.uri}
        width={boulderImage.width}
        height={boulderImage.height}
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
    </View>
  );
};

export default PreviewEditScreen;
