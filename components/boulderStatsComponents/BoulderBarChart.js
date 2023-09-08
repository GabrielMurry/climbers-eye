import { View, Text, Dimensions } from "react-native";
import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

const screenWidth = Dimensions.get("window").width;

const BoulderBarChart = ({ boulderBarChartData, isProject = false }) => {
  return (
    <View style={{ marginLeft: 10 }}>
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
          data={boulderBarChartData}
        />
      </VictoryChart>
    </View>
  );
};

export default BoulderBarChart;
