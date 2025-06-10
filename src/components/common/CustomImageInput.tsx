import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ImageObjUrl } from "../../utils/types/image";
import { Image } from "expo-image";
import { PhotoIcon } from "react-native-heroicons/outline";

type CustomImageInputProps = {
  image: ImageObjUrl | null;
  openCamera: () => void;
  title?: string;
};

const CustomImageInput: React.FC<CustomImageInputProps> = ({
  image,
  openCamera,
  title,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {/* <Title title={title} /> */}
      {image ? (
        <TouchableOpacity style={{ height: 400 }} onPress={() => openCamera()}>
          <Image
            source={image.url}
            contentFit="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 5,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => openCamera()}
        >
          <PhotoIcon color={"black"} size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomImageInput;
