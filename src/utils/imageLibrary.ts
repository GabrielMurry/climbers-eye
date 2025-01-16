import { launchImageLibraryAsync } from "expo-image-picker";

export const getImageFromLibrary = async () => {
  return await launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1, // 1: highest quality. 0: lowest quality.
  });
};
