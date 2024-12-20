import { Image, StyleSheet } from "react-native";
import { ImageObjUrl } from "../../utils/types/image";

type ImagePreviewProps = {
  image: ImageObjUrl;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
  return <Image source={{ uri: image.url }} style={styles.camera} />;
};

export default ImagePreview;

const styles = StyleSheet.create({
  camera: {
    flex: 4 / 3,
  },
});
