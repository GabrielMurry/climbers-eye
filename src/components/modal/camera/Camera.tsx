import { CameraView, CameraViewRef } from "expo-camera";
import React, { LegacyRef, Ref } from "react";
import { StyleSheet } from "react-native";

type CameraProps = {
  cameraRef: LegacyRef<CameraView>;
  setCameraReady: (isReady: boolean) => void;
};

const Camera: React.FC<CameraProps> = ({ cameraRef, setCameraReady }) => {
  return (
    <CameraView
      style={styles.camera}
      onCameraReady={() => setCameraReady(true)}
      ref={cameraRef}
      ratio="4:3"
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
