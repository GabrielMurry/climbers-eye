import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { request } from "../api/requestMethods";
import {
  boulderBarChartDataTemplate,
  boulderPieChartDataTemplate,
} from "../utils/constants/boulderConstants";
import BoulderPieChart from "../components/boulderStatsComponents/BoulderPieChart";
import BoulderBarChart from "../components/boulderStatsComponents/BoulderBarChart";
import useCustomHeader from "../hooks/useCustomHeader";
import { useSelector } from "react-redux";

const BoulderStatsScreen = ({ route, navigation }) => {
  const { boulder } = route.params;
  const { user } = useSelector((state) => state.userReducer);

  const [boulderBarChartData, setBoulderBarChartData] = useState(
    boulderBarChartDataTemplate
  );
  const [isProject, setIsProject] = useState(true);
  // const [boulderPieChartData, setBoulderPieChartData] = useState(
  //   boulderPieChartDataTemplate
  // );

  useCustomHeader({
    navigation,
    title: "Boulder Statistics",
  });

  useEffect(() => {
    fetchBoulderStats();
  }, []);

  const fetchBoulderStats = async () => {
    const response = await request("get", `boulder_stats/${boulder.id}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setBoulderBarChartData(response.data.bouldersBarChartData);
      // if (response.data.bouldersPieChartData) {
      //   setBoulderPieChartData(response.data.bouldersPieChartData);
      // }
      setIsProject(response.data.isProject);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ padding: 10 }}>
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
            {boulder.firstAscent ? boulder.firstAscent : "-"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Sends:</Text>
          <Text style={styles.info}>{boulder.sends}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Published:</Text>
          <Text style={styles.info}>{boulder.date}</Text>
        </View>
      </View>
      <BoulderBarChart data={boulderBarChartData} isProject={isProject} />
      {/* {boulderPieChartData ? (
        <BoulderPieChart boulderPieChartData={boulderPieChartData} />
      ) : null} */}
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
