import { CameraView, useCameraPermissions } from "expo-camera";
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
import { ImageObjUrl } from "../../utils/types/image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraStackParamList } from "../../navigation/CameraStack";

type Props = NativeStackScreenProps<CameraStackParamList, "Camera">;

const CameraScreen = ({ navigation }: Props) => {
  const [image, setImage] = useState<ImageObjUrl | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => <></>,
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => navigation.goBack()}>
  //         <XMarkIcon size={30} color={"white"} />
  //       </TouchableOpacity>
  //     ),
  //     headerRight: () => "",
  //     headerStyle: { backgroundColor: "black" },
  //   });
  // }, [navigation]);

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
    const parentNav = navigation.getParent();
    console.log(parentNav);
    console.log(parentNav?.getId());
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
  };

  return (
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
  );
};

export default CameraScreen;
