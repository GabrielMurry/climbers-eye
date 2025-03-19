import { ScrollView, SafeAreaView, View } from "react-native";
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

export type ChartData = {
  label: string;
  value: number;
};

type BoulderScreenProps = NativeStackScreenProps<
  HomeStackParamsList,
  "Boulder"
>;

const BoulderScreen: React.FC<BoulderScreenProps> = ({ route }) => {
  const boulderId = route.params.boulderId;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const boulder = useAppSelector((state) => selectBoulder(state, boulderId));
  if (!boulder) {
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

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchBoulderDetail();
  //   }, [])
  // );

  const spraywall = useAppSelector((state) => selectSpraywall(state));
  if (!spraywall) {
    return;
  }

  if (!boulder) {
    return;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <BoulderHeader boulderId={boulderId} />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Header boulder={boulder} />
        <View style={{ backgroundColor: "blue", height: 500 }}>
          <BoulderImage
            boulderUri={boulder.url}
            spraywallUri={
              boulder.altWallUrl ? boulder.altWallUrl : spraywall.url
            }
            width={boulder.width}
            height={boulder.height}
            // shrinkScale={0.3}
          />
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
    </SafeAreaView>
  );
};

export default BoulderScreen;
