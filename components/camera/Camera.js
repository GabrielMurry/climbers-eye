import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";

const Camera = ({ cameraRef, setCameraReady }) => {
  return (
    <CameraView
      style={styles.camera}
      onCameraReady={() => setCameraReady(true)}
      ref={cameraRef}
      ratio="3:4"
      pictureSize="Photo"
    />
  );
};

export default Camera;

const styles = StyleSheet.create({
  camera: {
    flex: 4 / 3,
  },
});
