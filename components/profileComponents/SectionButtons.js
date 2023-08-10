import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import { setSpraywallIndex } from "../../redux/actions";
import { ChartPieIcon } from "react-native-heroicons/outline";

const width = Dimensions.get("window").width;

const SectionButtons = ({
  sectionQuickData,
  setIsModalVisible,
  navigation,
}) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const { spraywalls, spraywallIndex } = useSelector(
    (state) => state.spraywallReducer
  );

  const handleSwitchWall = (interval) => {
    dispatch(setSpraywallIndex(interval - 1));
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }} key={item.id}>
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
          width: 100,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          width: "50%",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {item.name}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView
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
        <Carousel
          loop={false}
          width={width}
          height={width - 150}
          data={spraywalls}
          defaultIndex={spraywallIndex}
          keyExtractor={(item) => item.id}
          scrollAnimationDuration={250}
          onSnapToItem={(index) => dispatch(setSpraywallIndex(index))}
          renderItem={renderItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
        />
        <View style={{ paddingHorizontal: 10, gap: 10 }}>
          <TouchableOpacity
            style={{
              height: 75,
              backgroundColor: "#FFFBF1",
              borderRadius: 10,
              flexDirection: "row",
              borderWidth: 1.5,
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Logbook" })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Logbook</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "lightblue",
                  width: "90%",
                  height: "80%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{sectionQuickData.logbook}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 75,
              backgroundColor: "#FFFBF1",
              borderRadius: 10,
              flexDirection: "row",
              borderWidth: 1.5,
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Likes" })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Likes</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "lightblue",
                  width: "90%",
                  height: "80%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{sectionQuickData.likes}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 75,
              backgroundColor: "#FFFBF1",
              borderRadius: 10,
              flexDirection: "row",
              borderWidth: 1.5,
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Bookmarks" })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Bookmarks</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "lightblue",
                  width: "90%",
                  height: "80%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{sectionQuickData.bookmarks}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 75,
              backgroundColor: "#FFFBF1",
              borderRadius: 10,
              flexDirection: "row",
              borderWidth: 1.5,
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Circuits" })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Circuits</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "lightblue",
                  width: "90%",
                  height: "80%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{sectionQuickData.circuits}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 75,
              backgroundColor: "#FFFBF1",
              borderRadius: 10,
              flexDirection: "row",
              borderWidth: 1.5,
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Creations" })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Creations</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "lightblue",
                  width: "90%",
                  height: "80%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{sectionQuickData.creations}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 25, borderRadius: 10 }}></View>
      </View>
    </ScrollView>
  );
};

export default SectionButtons;
