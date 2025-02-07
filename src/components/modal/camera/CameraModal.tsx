import { View, Text, Modal, SafeAreaView, Button } from "react-native";
import React, { useRef, useState } from "react";
import ButtonControls from "../../camera/ButtonControls";
import ImagePreview from "../../camera/ImagePreview";
import Camera from "../../camera/Camera";
import { ImageObjUrl } from "../../../utils/types/image";
import { CameraView, useCameraPermissions } from "expo-camera";

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
    // if (parentNav?.getId() === 'EditBoulder') {
    //   parentNav.navigate('')
    // }
    // switch (nextScreen) {
    //   case "EditBoulder":
    //     navigation.replace("BoulderStack", {
    //       screen: "EditBoulder",
    //       params: { image: image },
    //     });
    //     break;
    //   case "AddNewSprayWall":
    //     navigation.navigate("SpraywallStack", {
    //       screen: "AddNewSprayWall",
    //       params: { image: image },
    //     });
    //     break;
    //   default:
    //     console.error("Invalid navigation name.");
    // }
    closeCamera();
  };

  return (
    <Modal visible={isVisible}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
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
