import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { colors } from "../../utils/styles";
import { useSelector } from "react-redux";

const FlatListSpraywalls = ({
  spraywalls,
  handleSpraywallPress,
  highlight = false,
}) => {
  const { spraywallIndex } = useSelector((state) => state.spraywallReducer);

  return (
    <FlatList
      data={spraywalls}
      renderItem={({ item, index }) => (
        <Pressable
          style={{
            height: "100%",
            aspectRatio: 1,
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          key={item.id}
          onPress={() => handleSpraywallPress({ item, index })}
        >
          <View
            style={{
              height: "110%",
              aspectRatio: 1,
              position: "absolute",
              borderRadius: 2,
              backgroundColor: colors.primaryLight,
              borderWidth: highlight ? 2 : 0,
              borderColor:
                highlight && index === spraywallIndex
                  ? colors.primary
                  : colors.primaryLight,
            }}
          />
          <Image
            source={{ uri: item.url }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              opacity: !highlight ? 1 : index === spraywallIndex ? 1 : 0.8,
            }}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 10 }}
      horizontal
    />
  );
};

export default FlatListSpraywalls;
