import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import CameraButton from "../components/CameraButton";

const CameraScreen = ({ route, navigation }) => {
  const { screen } = route.params;

  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setHasCameraPermission] =
    Camera.useCameraPermissions(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })(); // little trick to allow us to immediately call this async function
    // clean up on unmount???
  });

  const takePicture = async () => {
    if (cameraRef) {
      try {
        // const options = { base64: true, ImageType: "png", quality: 0 }; // cameraPictureOptions for expo camera types (uri, width, and height are default)
        const data = await cameraRef.current.takePictureAsync();
        const compressedData = await manipulateAsync(data.uri, [], {
          compress: 0.5,
          format: SaveFormat.PNG,
          base64: true,
        });
        setImage(compressedData); // data also contains height and width
      } catch (error) {
        console.log(error);
      }
    }
  };

  const confirmImage = async () => {
    if (image) {
      navigation.navigate(screen, { image: image });
    }
  };

  if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {!image ? ( // if we don't have an image, take image
        <>
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 30,
              }}
            ></View>
          </Camera>
        </>
      ) : (
        <Image source={{ uri: image.uri }} style={styles.camera} />
      )}
      {!image ? ( // if we don't have an image, use "regular" camera button circle
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            height: 100,
          }}
        >
          <CameraButton
            icon="flash"
            color={
              flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
            }
            size={50}
            onPress={() =>
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              )
            }
          />
          <CameraButton
            icon="radio-button-on"
            size={85}
            onPress={takePicture}
          />
          <CameraButton
            icon="rotate-3d-variant"
            size={50}
            onPress={() =>
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              )
            }
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            height: 100,
          }}
        >
          <CameraButton icon="check-circle" size={65} onPress={confirmImage} />
          <CameraButton icon="redo" size={60} onPress={() => setImage(null)} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
});