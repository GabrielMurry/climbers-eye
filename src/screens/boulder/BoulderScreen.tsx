import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getBoulderDetail } from "../../services/boulder/boulder";
import { updateBoulder } from "../../redux/features/boulder/boulderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { selectBoulder } from "../../redux/features/boulder/boulderSelectors";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { UserSendsData } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "../../components/boulder/detail/Header";
import Body from "../../components/boulder/detail/Body";
import Footer from "../../components/boulder/detail/Footer";
import BoulderHeader from "../../components/boulder/BoulderHeader";

export type ChartData = {
  label: string;
  value: number;
};

type BoulderScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "Boulder"
>;

const THEME_STYLE = "white"; //rgba(245,245,245,255)

const BoulderScreen: React.FC<BoulderScreenProps> = ({ route }) => {
  const boulderId = route.params.boulderId;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const boulder = useAppSelector((state) => selectBoulder(state, boulderId));

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [userSendsData, setUserSendsData] = useState<UserSendsData[]>([]);

  const fetchBoulderDetail = async () => {
    const path = { boulderId: boulder.id };
    const response = await getBoulderDetail(path);
    setChartData(response.data.boulderBarChartData);
    setUserSendsData(response.data.userSendsData);
    dispatch(updateBoulder(boulder.id, response.data));
  };

  useFocusEffect(
    useCallback(() => {
      fetchBoulderDetail();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <BoulderHeader boulderId={boulderId} />
      <ScrollView>
        <Header boulder={boulder} />
        <Body
          boulder={boulder}
          chartData={chartData}
          userSendsData={userSendsData}
          user={user}
        />
        <Footer boulder={boulder} />
        {/* empty view cushion */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_STYLE,
  },
});
