import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import { boulderBarChartData } from "../utils/constants/boulderConstants";
import { request } from "../api/requestMethods";

const screenWidth = Dimensions.get("window").width;

const BoulderBarChart = ({ boulder }) => {
  const [bouldersData, setBouldersData] = useState(boulderBarChartData);
  const [isProject, setIsProject] = useState(true);

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
      setBouldersData(response.data.bouldersData);
      setIsProject(response.data.isProject);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.block}>
        <View style={{ marginLeft: 25 }}>
          <VictoryChart
            theme={VictoryTheme.material}
            height={400}
            width={screenWidth}
            domainPadding={{ x: 8 }}
          >
            {!isProject ? (
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: { fontSize: 12 }, // Adjust the fontSize value for the y-axis tick labels
                }}
              />
            ) : null}
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 9 }, // Adjust the fontSize value for the x-axis tick labels
              }}
            />
            <VictoryBar
              horizontal
              labels={({ datum }) => (datum.y !== 0 ? datum.y : null)}
              style={{
                data: { fill: "#c43a31" },
                // labels: { fill: "black" },
              }}
              barWidth={8}
              data={bouldersData}
            />
          </VictoryChart>
        </View>
      </View>
    </View>
  );
};

export default BoulderBarChart;

const styles = StyleSheet.create({
  block: {
    minHeight: 425,
    width: "98%",
    borderColor: "black",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
    backgroundColor: "#FFFBF1",
    justifyContent: "center",
    alignItems: "center",
    // adding shadow to image
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
});
