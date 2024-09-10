import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ChevronRightIcon, UserIcon } from "react-native-heroicons/outline";

const SettingsButton = ({
  title,
  onPress,
  textColor = "black",
  destructive = false,
  placeHolder = null,
  imageUrl = null,
}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      {imageUrl ? (
        <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
          <View
            style={{
              alignItems: "center",
              width: 100,
              height: 100,
              backgroundColor: "lightblue",
              borderRadius: 100,
            }}
          >
            {imageUrl === "default" ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UserIcon size={50} color={"black"} />
              </View>
            ) : (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
            )}
          </View>
          <Text>Change Photo</Text>
        </View>
      ) : (
        <>
          <Text style={{ fontSize: 16, color: textColor }}>{title}</Text>
          <View style={{ flex: 1, alignItems: "flex-end", marginRight: 5 }}>
            <Text style={{ fontSize: 16, color: textColor }}>
              {placeHolder}
            </Text>
          </View>
          {destructive ? null : <ChevronRightIcon size={15} color={"black"} />}
        </>
      )}
    </TouchableOpacity>
  );
};

export default SettingsButton;
