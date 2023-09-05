import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { request } from "../api/requestMethods";
import {
  boulderBarChartDataTemplate,
  boulderPieChartDataTemplate,
} from "../utils/constants/boulderConstants";
import BoulderPieChart from "../components/boulderStatsComponents/BoulderPieChart";
import BoulderBarChart from "../components/boulderStatsComponents/BoulderBarChart";
import useCustomHeader from "../hooks/useCustomHeader";

const BoulderStatsScreen = ({ route, navigation }) => {
  const { boulder } = route.params;

  const [boulderBarChartData, setBoulderBarChartData] = useState(
    boulderBarChartDataTemplate
  );
  const [isProject, setIsProject] = useState(true);
  const [boulderPieChartData, setBoulderPieChartData] = useState(
    boulderPieChartDataTemplate
  );

  useCustomHeader({
    navigation,
    title: "Statistics",
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
      if (response.data.bouldersPieChartData) {
        setBoulderPieChartData(response.data.bouldersPieChartData);
      }
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
      {boulderPieChartData ? (
        <BoulderPieChart boulderPieChartData={boulderPieChartData} />
      ) : null}
      <BoulderBarChart
        boulderBarChartData={boulderBarChartData}
        isProject={isProject}
      />
    </View>
  );
};

export default BoulderStatsScreen;
