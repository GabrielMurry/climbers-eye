import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import {
  ArrowUpOnSquareIcon,
  CameraIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../utils/styles";
import ModalButton from "./ModalButton";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  isBoulder?: boolean;
};

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  isBoulder = true,
}) => {
  const navigation = useNavigation();
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    console.error("Selected spray wall not found.");
    return <Text>Selected spray wall not found.</Text>;
  }

  const handleCameraPressed = () => {
    onClose();
    const nextScreen = isBoulder ? "EditBoulder" : "AddNewSprayWall";
    navigation.navigate("CameraStack", { screen: "Camera" });
  };

  const handleDefaultImagePressed = () => {
    onClose();
    const image = {
      url: spraywall.url,
      width: spraywall.width,
      height: spraywall.height,
    };
    navigation.navigate("BoulderStack", {
      screen: "EditBoulder",
      params: { image },
    });
  };

  const handleUploadImagePressed = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5, // 1: highest quality. 0: lowest quality.
    });
    if (result.canceled) return;
    const image = result.assets[0];
    if (isBoulder) {
      navigation.navigate("BoulderStack", {
        screen: "EditBoulder",
        params: {
          image: {
            url: image.uri,
            width: image.width,
            height: image.height,
          },
        },
      });
    } else {
      navigation.navigate("SpraywallStack", {
        screen: "AddNewSprayWall",
        params: {
          image: {
            url: image.uri,
            width: image.width,
            height: image.height,
          },
        },
      });
    }
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView style={styles.modalContent} intensity={25}>
          {/* Add modal content here */}
          <View style={styles.displayContainer}>
            {/* title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {isBoulder ? "Add Boulder" : "Add New Spray Wall"}
              </Text>
            </View>
            {/* image */}
            {isBoulder ? (
              <Image
                source={{ uri: spraywall?.url }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : null}
            {/* buttons */}
            <View style={styles.buttonContainer}>
              <ModalButton
                onPress={handleCameraPressed}
                icon={<CameraIcon size={25} color={colors.primary} />}
                label={"Camera"}
              />
              {isBoulder ? (
                <ModalButton
                  onPress={handleDefaultImagePressed}
                  icon={<PhotoIcon size={25} color={colors.primary} />}
                  label={"Default Image"}
                  isEmphasized={true}
                />
              ) : null}
              <ModalButton
                onPress={handleUploadImagePressed}
                icon={<ArrowUpOnSquareIcon size={25} color={colors.primary} />}
                label={"Upload"}
              />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  displayContainer: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    position: "absolute", //Here is the trick
    bottom: 90, //Here is the trick
    alignSelf: "center",
  },
  titleContainer: {
    padding: 10,
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  image: {
    width: "100%",
    height: 225,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    width: "100%",
    gap: 10,
  },
});
