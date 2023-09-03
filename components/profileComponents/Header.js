import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { UserIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import FullScreenImage from "../FullScreenImage";

const Header = ({ navigation }) => {
  const { user, headshotImage } = useSelector((state) => state.userReducer);

  const [imageFullScreen, setImageFullScreen] = useState(false);

  const handleImagePress = () => {
    if (!headshotImage.url) return;
    setImageFullScreen(true);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 100,
      }}
    >
      <View style={{ width: "75%" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {user?.username}
        </Text>
      </View>
      <Pressable
        style={{
          height: "100%",
          aspectRatio: 1,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        onPress={handleImagePress}
      >
        {headshotImage.url ? (
          <Image
            source={{ uri: headshotImage.url }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        ) : (
          <UserIcon size={50} color={"black"} />
        )}
      </Pressable>
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={headshotImage.url}
        width={headshotImage.width}
        height={headshotImage.height}
        onRequestClose={() => setImageFullScreen(false)}
      />
    </View>
  );
};

export default Header;
