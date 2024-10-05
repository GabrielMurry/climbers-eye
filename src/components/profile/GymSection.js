import { View, Text, Dimensions, Pressable } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import { setSpraywallIndex } from "../../redux/features/spraywall/spraywallSlice";

const width = Dimensions.get("window").width;

const GymSection = () => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywall
  );

  const renderSpraywallItem = ({ item }) => (
    <Pressable style={{ flex: 1 }} key={item.id}>
      <Image
        source={{ uri: item.url }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          width: "40%",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View
      contentContainerStyle={{
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={{ backgroundColor: "lightgray", height: 3 }} />
        <View
          style={{
            paddingHorizontal: 30,
            marginTop: 10,
            flexDirection: "row",
            height: 30,
            alignItems: "center",
          }}
        >
          {/* section title */}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{gym.name}</Text>
        </View>
        <Carousel
          loop={false}
          width={width}
          height={width - 150}
          data={spraywalls}
          defaultIndex={spraywallIndex}
          keyExtractor={(item) => item.id}
          scrollAnimationDuration={250}
          onSnapToItem={(index) => dispatch(setSpraywallIndex(index))}
          renderItem={renderSpraywallItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
        />
      </View>
    </View>
  );
};

export default GymSection;
