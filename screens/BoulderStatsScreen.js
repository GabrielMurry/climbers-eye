import { View, Text, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { request } from "../api/requestMethods";
import {
  Bar,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import {
  boulderBarChartData,
  boulderPieChartData,
} from "../utils/constants/boulderConstants";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const bouldersDataInitialPie = [
  { label: "7a+/V7", value: 1, percentage: 50.0 },
  { label: "7b/V8", value: 1, percentage: 50.0 },
];

// const bouldersDataInitial = [
// { x: "4a/V0", y: 1 },
// { x: "4b/V0", y: 2 },
// { x: "4c/V0", y: 0 },
// { x: "5a/V1", y: 5 },
// { x: "5b/V1", y: 0 },
// { x: "5c/V2", y: 10 },
// { x: "6a/V3", y: 0 },
// { x: "6a+/V3", y: 1 },
// { x: "6b/V4", y: 3 },
// { x: "6b+/V4", y: 0 },
// { x: "6c/V5", y: 0 },
// { x: "6c+/V5", y: 0 },
// { x: "7a/V6", y: 0 },
// { x: "7a+/V7", y: 0 },
// { x: "7b/V8", y: 0 },
// { x: "7b+/V8", y: 4 },
// { x: "7c/V9", y: 0 },
// { x: "7c+/V10", y: 0 },
// { x: "8a/V11", y: 0 },
// { x: "8a+/V12", y: 0 },
// { x: "8b/V13", y: 0 },
// { x: "8b+/V14", y: 0 },
// { x: "8c/V15", y: 0 },
// { x: "8c+/V16", y: 0 },
// ];

// const totalGraders = bouldersDataInitial.reduce(
//   (total, boulder) => total + boulder.y,
//   0
// );

// const bouldersWithPercentage = bouldersDataInitial
//   .filter((boulder) => boulder.y > 0)
//   .map((boulder) => ({
//     ...boulder,
//     percentage: (boulder.y / totalGraders) * 100,
//   }));

// const sortedBoulders = bouldersWithPercentage.sort(
//   (a, b) => b.percentage - a.percentage
// );

// const pieData = [
//   {
//     value: 47,
//     color: "#009FFF",
//     gradientCenterColor: "#006DFF",
//     focused: true,
//   },
//   { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
//   { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
//   { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
// ];

// const barData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

const BoulderStatsScreen = ({ route }) => {
  const { boulder } = route.params;

  const [bouldersData, setBouldersData] = useState(boulderBarChartData);
  const [isProject, setIsProject] = useState(true);
  const [sortedBouldersPie, setSortedBouldersPie] =
    useState(boulderBarChartData);
  const [bouldersPieChartData, setBouldersPieChartData] =
    useState(boulderPieChartData);

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
      setBouldersData(response.data.bouldersBarChartData);
      if (response.data.bouldersPieChartData) {
        setBouldersPieChartData(response.data.bouldersPieChartData);
      }
      setIsProject(response.data.isProject);
    }
  };

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot(item.color)}
            {item.label !== "Project" ? (
              <Text style={{ color: "white" }}>
                {item.label}: {item.percentage.toFixed(0)}%
              </Text>
            ) : null}
          </View>
        </View>
      </>
    );
  };

  const pieChartData = () => {
    const totalGradersPie = bouldersData.reduce(
      (total, boulder) => total + boulder.y,
      0
    );
    const bouldersWithPercentagePie = bouldersData
      .filter((boulder) => boulder.y > 0)
      .map((boulder) => ({
        ...boulder,
        percentage: (boulder.y / totalGradersPie) * 100,
      }));
    const sorted = bouldersWithPercentagePie.sort(
      (a, b) => b.percentage - a.percentage
    );
    setSortedBouldersPie(sorted);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* <VictoryPie
        width={screenWidth}
        height={screenHeight / 2}
        // padAngle={({ datum }) => datum.y}
        labels={({ datum }) => [`${datum.x}:`, `${datum.y.toFixed(0)}%`]}
        innerRadius={screenWidth - 290}
        data={sortedBoulders}
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        labelComponent={
          <VictoryLabel
            textAnchor="middle"
            backgroundPadding={[5, { left: 20, right: 20 }, { left: 20 }]}
            // backgroundStyle={[
            //   { fill: "red", opacity: 0.1 },
            //   { fill: "green", opacity: 0.1 },
            // ]}
          />
        }
      /> */}
      {bouldersPieChartData ? (
        <View
          style={{
            marginTop: 10,
            marginBottom: -15,
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 20,
            backgroundColor: "#232B5D",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Boulder Stats
          </Text>
          <View style={{ padding: 20, alignItems: "center", marginLeft: 15 }}>
            <PieChart
              data={bouldersPieChartData}
              donut
              sectionAutoFocus
              radius={90}
              innerRadius={50}
              innerCircleColor={"#232B5D"}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {bouldersPieChartData[0].percentage.toFixed(0)}%
                    </Text>
                    <Text style={{ fontSize: 14, color: "white" }}>
                      {bouldersPieChartData[0].label}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <FlatList
            data={bouldersPieChartData}
            contentContainerStyle={{
              alignItems: "center",
              marginLeft: 25,
            }}
            numColumns={2}
            keyExtractor={(item) => item.x}
            renderItem={renderLegendComponent}
          />
        </View>
      ) : null}
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
            data={bouldersData}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default BoulderStatsScreen;
