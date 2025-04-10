import * as FileSystem from "expo-file-system";

export const readCacheDirectory = async () => {
  try {
    const dir = FileSystem.cacheDirectory;
    if (dir) {
      const files = await FileSystem.readDirectoryAsync(dir);
      files.forEach((file) => {
        console.log(file);
      });
    } else {
      console.log("Directory does not exist.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const readDocumentDirectory = async () => {
  try {
    const dir = FileSystem.documentDirectory;
    if (dir) {
      const files = await FileSystem.readDirectoryAsync(dir);
      console.log("Document Files:");
      files.forEach((file) => {
        console.log(file);
      });
    } else {
      console.log("Directory does not exist.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteLocalFile = async (uri: string) => {
  try {
    await FileSystem.deleteAsync(uri);
  } catch (error) {
    console.error("Failed to delete the local file.", error);
  }
};
