import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// import BarChartHorizontal from "../../components/boulder/stats/BarChartHorizontal";
import QualityRating from "../../components/boulder/QualityRating";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { ChartData } from "./BoulderScreen";
import { getBoulderDetail } from "../../services/boulder/boulder";
import BarChartHorizontal from "../../components/barChart/BarChartHorizontal";

type BoulderStatsScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "BoulderStats"
>;

const BoulderStatsScreen: React.FC<BoulderStatsScreenProps> = ({ route }) => {
  const boulder = route.params.boulder;

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchBoulderStats = async () => {
      const path = { boulderId: boulder.id };
      const response = await getBoulderDetail(path);
      setChartData(response.data.boulderBarChartData);
    };

    fetchBoulderStats();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <View style={styles.row}>
        <Text style={styles.label}>Boulder:</Text>
        <Text style={styles.info}>{boulder.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Setter:</Text>
        <Text style={styles.info}>{boulder.setter}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>First Ascent:</Text>
        <Text style={styles.info}>
          {boulder.firstAscensionist ? boulder.firstAscensionist : "-"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Quality:</Text>
        <View style={styles.info}>
          <QualityRating quality={boulder.quality} size={18} />
          <Text>({boulder.quality} / 3)</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Sends:</Text>
        <Text style={styles.info}>{boulder.sends}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Your Sends:</Text>
        <Text style={styles.info}>{boulder.userSendsCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Published:</Text>
        <Text style={styles.info}>{boulder.date}</Text>
      </View>
      <BarChartHorizontal data={chartData} displayHeader={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  info: {
    flexDirection: "row",
    flex: 2,
    fontSize: 16,
    color: "#555",
  },
});

export default BoulderStatsScreen;
