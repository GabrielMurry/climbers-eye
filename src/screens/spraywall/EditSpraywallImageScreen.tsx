import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { launchImageLibraryAsync } from "expo-image-picker";
import { updateSpraywallAPI } from "../../services/spraywall";
import { updateSpraywall } from "../../redux/features/spraywall/spraywallSlice";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../redux/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SpraywallStackParamList } from "../../navigation/SpraywallStack";
import { ImageObjUrl } from "../../utils/types/image";

type EditSpraywallImageScreenProps = NativeStackScreenProps<
  SpraywallStackParamList,
  "EditSpraywallImage"
>;

const EditSpraywallImageScreen: React.FC<EditSpraywallImageScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const spraywall = route.params.spraywall;

  const { showActionSheetWithOptions } = useActionSheet();

  const [newImage, setNewImage] = useState<ImageObjUrl>({
    url: spraywall.url,
    width: spraywall.width,
    height: spraywall.height,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNewImage({
      url: spraywall.url,
      width: spraywall.width,
      height: spraywall.height,
    });
  }, [spraywall.url]);

  useEffect(() => {
    if (newImage.url) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newImage]);

  const handleSave = async () => {
    setIsLoading(true);
    const data = {
      url: newImage.url.split(",")[1],
      width: newImage.width,
      height: newImage.height,
    };
    const pathParams = { spraywallId: spraywall.id };
    const response = await updateSpraywallAPI(pathParams, data);
    if (response.status === 200) {
      dispatch(
        updateSpraywall(spraywall.id, {
          url: response.data.url,
          width: response.data.width,
          height: response.data.height,
        })
      );
      navigation.goBack();
    }
    setIsLoading(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (result && !result.canceled) {
      const { base64, width, height } = result.assets[0];
      setNewImage({
        url: "data:image/png;base64," + base64,
        width: width,
        height: height,
      });
    }
  };

  const handleImagePress = async () => {
    let options = ["Take a photo", "Choose from library", "Cancel"];
    let destructiveButtonIndex = -1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            navigation.navigate("CameraStack", { screen: "Camera" });
            break;

          case 1:
            pickImage();
            break;

          case destructiveButtonIndex:
            // Delete
            // deleteBoulder();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    title: "Edit Spray Wall Image",
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={handleImagePress}>
          <Image
            source={{ uri: newImage.url ?? spraywall.url }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </Pressable>
        <View>
          <TouchableOpacity
            style={[styles.button, isDisabled && styles.disabledButton]}
            disabled={isDisabled}
            onPress={handleSave}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditSpraywallImageScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(0, 122, 255)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#888",
  },
});
