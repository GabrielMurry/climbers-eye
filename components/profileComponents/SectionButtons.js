import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../Carousel";
import { setSpraywallIndex } from "../../redux/actions";
import { ChartPieIcon } from "react-native-heroicons/outline";

const SectionButtons = ({
  sectionQuickData,
  setIsModalVisible,
  navigation,
}) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gymReducer);
  const { spraywalls } = useSelector((state) => state.spraywallReducer);

  const handleSwitchWall = (interval) => {
    dispatch(setSpraywallIndex(interval - 1));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "90%",
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ flex: 1, gap: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFBF1",
                flex: 1,
                height: 75,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1.5,
              }}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {gym.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFBF1",
                flex: 1,
                height: 75,
                borderRadius: 10,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 1.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ChartPieIcon size={30} color={"black"} />
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
                    width: "80%",
                    height: "80%",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {sectionQuickData.statistics}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Carousel
              style="slides"
              itemsPerInterval={1}
              items={spraywalls}
              itemInterval={handleSwitchWall}
              isSquare={true}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 75,
            backgroundColor: "#FFFBF1",
            borderRadius: 10,
            flexDirection: "row",
            borderWidth: 1.5,
          }}
          onPress={() =>
            navigation.navigate("ProfileSection", { section: "logbook" })
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
            navigation.navigate("ProfileSection", { section: "likes" })
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
            navigation.navigate("ProfileSection", { section: "bookmarks" })
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
            navigation.navigate("ProfileSection", { section: "circuits" })
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
            navigation.navigate("ProfileSection", { section: "creations" })
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
        <View style={{ height: 75, borderRadius: 10 }}></View>
      </View>
    </ScrollView>
  );
};

export default SectionButtons;
