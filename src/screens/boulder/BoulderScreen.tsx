import { View, Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { UserSendsData } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import BoulderImage from "../../components/boulder/BoulderImage";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import DraftNotif from "../../components/boulder/DraftNotif";
import InfoRow1 from "../../components/boulder/detail/InfoRow1";
import InfoRow2 from "../../components/boulder/detail/InfoRow2";
import InfoRow3 from "../../components/boulder/detail/InfoRow3";
import InfoRow4 from "../../components/boulder/detail/InfoRow4";
import InfoRow6 from "../../components/boulder/detail/InfoRow6";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors, padding } from "../../utils/styles";
import {
  EllipsisHorizontalIcon,
  LinkIcon,
} from "react-native-heroicons/outline";
import { FontAwesome } from "@expo/vector-icons";
import SaveButton from "../../components/boulder/detail/SaveButton";
import AddToCircuitButton from "../../components/boulder/detail/AddToCircuitButton";
import Header from "../../components/common/header/Header";
import { Option } from "../../utils/types/options";
import {
  deleteBoulder,
  updateBoulder,
} from "../../redux/features/boulder/boulderSlice";
import {
  deleteBoulderAPI,
  updateBoulderAPI,
} from "../../services/boulder/boulder";
import { useOptions } from "../../hooks/useOptions";
import { useModalOptions } from "../../contexts/ModalOptionsContext";

export type ChartData = {
  label: string;
  value: number;
};

type BoulderScreenProps = NativeStackScreenProps<
  HomeStackParamsList,
  "Boulder"
>;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = 30;
const SLIDER_HEIGHT = 50;
const SLIDER_WIDTH = SCREEN_WIDTH;
const ANIM_DURATION = 750;

const BoulderScreen: React.FC<BoulderScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const routedBoulder = route.params.boulder;
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const boulder = routedBoulder;
  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    return;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [userSendsData, setUserSendsData] = useState<UserSendsData[]>([]);

  // const fetchBoulderDetail = async () => {
  //   const path = { boulderId: boulder.id };
  //   const response = await getBoulderDetail(path);
  //   setChartData(response.data.boulderBarChartData);
  //   setUserSendsData(response.data.userSendsData);
  //   dispatch(updateBoulder(boulder.id, response.data));
  // };

  const headerHeightSV = useSharedValue(insets.top + HEADER_HEIGHT);
  const sliderWidthSV = useSharedValue(SLIDER_WIDTH);
  const sliderColorWidthSV = useSharedValue(0);

  const handlePress = () => {
    if (headerHeightSV.get() > 0) {
      headerHeightSV.value = withTiming(0);
      sliderWidthSV.value = withTiming(0);
      bottomSheetRef.current?.close();
    } else {
      headerHeightSV.value = withTiming(insets.top + HEADER_HEIGHT);
      sliderWidthSV.value = withTiming(SLIDER_WIDTH);
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  useEffect(() => {
    sliderColorWidthSV.value = withTiming(0.5, {
      duration: ANIM_DURATION,
    });
  }, []);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["10", "20%", "75%"];

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleChange = (value: number) => {
    sliderColorWidthSV.value = value;
  };

  const handleDeleteBoulder = () => {
    Alert.alert(
      "Delete Boulder",
      `Are you sure you want to delete "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const pathParams = { boulderId: boulder.id };
            const response = await deleteBoulderAPI(pathParams);
            if (response.status === 204) {
              navigation.goBack();
              dispatch(deleteBoulder(boulder.id));
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handlePublishBoulder = () => {
    Alert.alert(
      "Publish Boulder",
      `Are you sure you want to publish "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Publish",
          onPress: async () => {
            const data = { publish: true };
            const pathParams = { boulderId: boulder.id };
            const response = await updateBoulderAPI(pathParams, data);
            if (response.status === 200) {
              navigation.goBack();
              dispatch(updateBoulder(boulder.id, { publish: true }));
            }
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };

  const getOptions = () => {
    if (!boulder) {
      return;
    }
    const options: Option[] = [
      // { title: "Share", onPress: () => shareInfo(boulder) },
      // { title: "Report", onPress: handleReportPress },
    ];
    // If your boulder is not published, add option to publish boulder
    if (!boulder.publish && boulder.setter === user.username) {
      options.unshift({
        title: "Publish Boulder",
        onPress: handlePublishBoulder,
        color: "blue",
      });
    }
    // If you are the setter of a boulder, give option to delete boulder
    if (boulder.setter === user.username) {
      const deleteBoulderOption = {
        title: "Delete Boulder",
        onPress: handleDeleteBoulder,
        color: "red",
      };
      const cancelOptionIndex = options.length - 1;
      options.splice(cancelOptionIndex, 0, deleteBoulderOption);
    }
    return options;
  };

  const { options } = useOptions(getOptions());

  const { openModal } = useModalOptions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {/* header */}
      <Animated.View
        style={{
          height: headerHeightSV,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "absolute",
          zIndex: 1,
          width: SCREEN_WIDTH,
        }}
      >
        <Text style={{ fontWeight: "bold", padding: 5, fontSize: 16 }}>
          {boulder.name}
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: padding.general }}
          onPress={() => openModal(options)}
        >
          <EllipsisHorizontalIcon size={35} color={"black"} />
        </TouchableOpacity>
      </Animated.View>
      <ReactNativeZoomableView
        style={{
          backgroundColor: "black",
          width: SCREEN_WIDTH,
          height: boulder.height * (SCREEN_WIDTH / boulder.width),
        }}
        maxZoom={10}
        minZoom={1}
        visualTouchFeedbackEnabled={false}
        onSingleTap={handlePress}
      >
        <BoulderImage
          boulderUri={boulder.url}
          spraywallUri={boulder.altWallUrl ? boulder.altWallUrl : spraywall.url}
          width={boulder.width}
          height={boulder.height}
          boulderOpacity={sliderColorWidthSV}
        />
      </ReactNativeZoomableView>
      {/* </View> */}
      {/* <DraftNotif boulder={boulder} />
      <InfoRow1 boulder={boulder} userID={user.id} />
      <InfoRow2
        boulder={boulder}
        chartData={chartData}
        userSendsData={userSendsData}
      />
      <InfoRow3 boulder={boulder} />
      <InfoRow4 boulder={boulder} />
      <InfoRow6 boulder={boulder} /> */}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        containerStyle={{ zIndex: 2 }}
        index={1}
      >
        <BottomSheetScrollView style={{ flex: 1 }}>
          {/* Slider */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <Slider
              minimumValue={0}
              maximumValue={1}
              value={0.5}
              onValueChange={handleChange}
              style={{ width: "100%" }}
              minimumTrackTintColor="green"
            />
          </View>

          {/* Content 1 */}
          <View
            style={{
              flexDirection: "row",
              height: 75,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {boulder.grade ? boulder.grade : "Project"}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 125,
                  borderRadius: 10,
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: boulder.isSent
                    ? colors.primary
                    : "rgba(235, 235, 235, 255)",
                }}
                onPress={() =>
                  navigation.navigate("BoulderStack", {
                    screen: "SendBoulder",
                    params: { boulder, userSendsData },
                  })
                }
              >
                <Text
                  style={{
                    color: boulder.isSent ? "white" : "black",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  {boulder.isSent ? "Repeat" : "Log Send"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Content 2 */}
          <View
            style={{
              flexDirection: "row",
              height: 75,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 125,
                  borderRadius: 10,
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: boulder.isSent
                    ? colors.primary
                    : "rgba(235, 235, 235, 255)",
                }}
                onPress={() =>
                  navigation.navigate("BoulderStack", {
                    screen: "BoulderStats",
                    params: { boulder },
                  })
                }
              >
                <Text
                  style={{
                    color: boulder.isSent ? "white" : "black",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Stats
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 15,
              }}
            >
              <SaveButton
                category="like"
                boulderId={boulder.id}
                userId={user.id}
              />
              <SaveButton
                category="bookmark"
                boulderId={boulder.id}
                userId={user.id}
              />
              <AddToCircuitButton boulder={boulder} />
            </View>
          </View>
          {/* Content 3 */}
          <InfoRow3 boulder={boulder} />
          <InfoRow4 boulder={boulder} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text>Setter: {boulder.setter}</Text>
          </View>
          <InfoRow6 boulder={boulder} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default BoulderScreen;
