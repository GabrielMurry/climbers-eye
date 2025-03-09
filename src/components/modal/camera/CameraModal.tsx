import {
  View,
  Text,
  Modal,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import ButtonControls from "./ButtonControls";
import ImagePreview from "./ImagePreview";
import Camera from "./Camera";
import { ImageObjUrl } from "../../../utils/types/image";
import { CameraView, useCameraPermissions } from "expo-camera";
import Header from "../../common/header/Header";
import { XMarkIcon } from "react-native-heroicons/outline";

type CameraModalProps = {
  image: ImageObjUrl | null;
  setImage: (image: ImageObjUrl | null) => void;
  isVisible: boolean;
  closeCamera: () => void;
};

const CameraModal: React.FC<CameraModalProps> = ({
  image,
  setImage,
  isVisible,
  closeCamera,
}) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <Text>We need your permission to show the camera.</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleImageTaken = async () => {
    if (!cameraReady) return;
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.5 });
      if (!photo) {
        console.error("Unable to take picture.");
        return;
      }
      setImage({
        url: photo.uri,
        width: photo.width,
        height: photo.height,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitImage = async () => {
    closeCamera();
  };

  const LeftIcon = (
    <TouchableOpacity onPress={() => closeCamera()}>
      <XMarkIcon size={30} color={"white"} />
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <Header leftIcon={LeftIcon} />
        {image ? (
          <ImagePreview image={image} />
        ) : (
          <Camera cameraRef={cameraRef} setCameraReady={setCameraReady} />
        )}
        <ButtonControls
          image={image}
          setImage={setImage}
          handleSubmitImage={handleSubmitImage}
          handleImageTaken={handleImageTaken}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default CameraModal;
