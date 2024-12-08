import * as FileSystem from "expo-file-system";

const checkAndDeleteFile = async (fileUri) => {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(fileUri);
    console.log("File deleted:", fileUri);
  } else {
    console.log("File does not exist:", fileUri);
  }
};
