import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  InteractionManager,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getBoulderDetail } from "../../services/boulder/boulder";
import { updateBoulder } from "../../redux/features/boulder/boulderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { selectBoulder } from "../../redux/features/boulder/boulderSelectors";
import { UserSendsData } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "../../components/boulder/detail/Header";
import BoulderHeader from "../../components/boulder/BoulderHeader";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import BoulderImage from "../../components/boulder/BoulderImage";
import { selectSpraywall } from "../../redux/features/spraywall/spraywallSelectors";
import DraftNotif from "../../components/boulder/DraftNotif";
import InfoRow1 from "../../components/boulder/detail/InfoRow1";
import InfoRow2 from "../../components/boulder/detail/InfoRow2";
import InfoRow3 from "../../components/boulder/detail/InfoRow3";
import InfoRow4 from "../../components/boulder/detail/InfoRow4";
import InfoRow6 from "../../components/boulder/detail/InfoRow6";
// import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image as ExpoImage } from "expo-image";

// const sprayWallImages = [
//   "https://climberseye.s3.amazonaws.com/spraywall/Wall-eb8d3f60-e9cf-4330-b26c-706231104d5e.jpg",
// ];

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

const BoulderScreen: React.FC<BoulderScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const routedBoulder = route.params.boulder;
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const boulder = useAppSelector((state) =>
    selectBoulder(state, routedBoulder.id)
  );
  if (!boulder) {
    return;
  }
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

  console.log(boulder.altWallUrl);
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: insets.top }}>
      <BoulderHeader boulder={boulder} />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Header boulder={boulder} />
        <View
          style={{
            height: 500,
            width: "100%",
          }}
        >
          <BoulderImage
            boulderUri={boulder.url}
            spraywallUri={
              boulder.altWallUrl ? boulder.altWallUrl : spraywall.url
            }
            width={boulder.width}
            height={boulder.height}
          />
          {/* <ExpoImage
            source={boulder.thumbnailUrl}
            contentFit="contain"
            cachePolicy="memory-disk"
            style={{ width: "100%", height: 500 }}
          /> */}
        </View>
        <DraftNotif boulder={boulder} />
        <InfoRow1 boulder={boulder} userID={user.id} />
        <InfoRow2
          boulder={boulder}
          chartData={chartData}
          userSendsData={userSendsData}
        />
        <InfoRow3 boulder={boulder} />
        <InfoRow4 boulder={boulder} />
        <InfoRow6 boulder={boulder} />
      </ScrollView>
    </View>
  );
};

export default BoulderScreen;
