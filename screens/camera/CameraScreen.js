import { useCameraPermissions } from "expo-camera";
import { useState, useLayoutEffect, useRef } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import ButtonControls from "../../components/camera/ButtonControls";
import Camera from "../../components/camera/Camera";
import ImagePreview from "../../components/camera/ImagePreview";

const CameraScreen = ({ navigation, route }) => {
  const { nextScreen } = route.params;

  const [image, setImage] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <></>,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <XMarkIcon size={30} color={"white"} />
        </TouchableOpacity>
      ),
      headerRight: () => "",
      headerStyle: { backgroundColor: "black" },
    });
  }, [navigation]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleImageTaken = async () => {
    if (!cameraReady) return;
    const imageData = await cameraRef.current.takePictureAsync({
      base64: true,
      quality: 0.7,
    });
    setImage({
      url: "data:image/png;base64," + imageData.base64,
      width: imageData.width,
      height: imageData.height,
    });
  };

  const handleSubmitImage = async () => {
    navigation.navigate(nextScreen, { image });
  };

  return (
    <SafeAreaView style={styles.container}>
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
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
