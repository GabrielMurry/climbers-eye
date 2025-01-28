import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { ImageObjUri } from "../../utils/types/image";

const SCREEN_WIDTH = Dimensions.get("window").width;

type FullScreenImageModalProps = {
  isVisible: boolean;
  image: ImageObjUri;
  closeModal: () => void;
};

const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({
  isVisible,
  image,
  closeModal,
}) => {
  return (
    <Modal visible={isVisible} transparent>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            position: "absolute",
            top: 60,
            left: 10,
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => closeModal()}
        >
          <Ionicons name="close" size={40} color="white" />
        </TouchableOpacity>
        <ReactNativeZoomableView
          maxZoom={10}
          minZoom={1}
          initialZoom={1}
          visualTouchFeedbackEnabled={false}
        >
          <Image
            source={{ uri: image?.uri }}
            style={{
              width: SCREEN_WIDTH,
              height: image.height * (SCREEN_WIDTH / image.width),
            }}
            cachePolicy={"none"}
          />
        </ReactNativeZoomableView>
      </SafeAreaView>
    </Modal>
  );
};

export default FullScreenImageModal;
