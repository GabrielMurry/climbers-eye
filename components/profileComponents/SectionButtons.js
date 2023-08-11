import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import { setSpraywallIndex } from "../../redux/actions";
import {
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  BookmarkIcon,
  ChartPieIcon,
  Cog8ToothIcon,
  HeartIcon,
  LinkIcon,
  PencilIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
} from "react-native-heroicons/outline";
import { ChevronRightIcon } from "react-native-heroicons/solid";

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
          <TouchableOpacity
            style={{
              marginLeft: 10,
              backgroundColor: "lightgray",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              width: 25,
              height: 25,
            }}
            onPress={() => setIsModalVisible(true)}
          >
            <ArrowsRightLeftIcon color={"black"} size={20} />
          </TouchableOpacity>
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
          renderItem={renderItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
        />
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Boulders and Statistics
          </Text>
        </View>
        <View style={{ paddingLeft: 30 }}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Statistics" })
            }
          >
            <View style={{ width: 30 }}>
              <ChartPieIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Statistics</Text>
            </View>
            <View
              style={{
                width: 75,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {sectionQuickData.statistics}
              </Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Logbook" })
            }
          >
            <View style={{ width: 30 }}>
              <TrophyIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Logbook</Text>
            </View>
            <View
              style={{
                width: 75,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{sectionQuickData.logbook}</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Likes" })
            }
          >
            <View style={{ width: 30 }}>
              <HeartIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Likes</Text>
            </View>
            <View
              style={{
                width: 75,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{sectionQuickData.likes}</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Bookmarks" })
            }
          >
            <View style={{ width: 30 }}>
              <BookmarkIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Bookmarks</Text>
            </View>
            <View
              style={{
                width: 75,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{sectionQuickData.bookmarks}</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Circuits" })
            }
          >
            <View style={{ width: 30 }}>
              <LinkIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Circuits</Text>
            </View>
            <View
              style={{
                width: 75,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{sectionQuickData.circuits}</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.navigate("ProfileSection", { section: "Creations" })
            }
          >
            <View style={{ width: 30 }}>
              <PencilIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Creations</Text>
            </View>
            <View
              style={{
                width: 75,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{sectionQuickData.creations}</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
        </View>
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Account</Text>
        </View>
        <View style={{ paddingLeft: 30 }}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={{ width: 30 }}>
              <WrenchScrewdriverIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Edit Profile</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              height: 60,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={{ width: 30 }}>
              <Cog8ToothIcon color={"black"} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>Settings and Privacy</Text>
            </View>
            <View
              style={{
                width: 50,
                alignItems: "center",
              }}
            >
              <ChevronRightIcon color={"black"} size={20} />
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={{ paddingHorizontal: 10, gap: 10 }}>
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
        <View style={{ height: 25, borderRadius: 10 }}></View> */}
      </View>
    </View>
  );
};

export default SectionButtons;
