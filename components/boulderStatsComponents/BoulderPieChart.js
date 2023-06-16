import { View, Text, FlatList } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";

const BoulderPieChart = ({ boulderPieChartData }) => {
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

  // Other pie format
  {
    /* <VictoryPie
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
      /> */
  }

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: -15,
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#232B5D",
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        Boulder Stats
      </Text>
      <View style={{ padding: 20, alignItems: "center", marginLeft: 15 }}>
        <PieChart
          data={boulderPieChartData}
          donut
          sectionAutoFocus
          radius={90}
          innerRadius={50}
          innerCircleColor={"#232B5D"}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {boulderPieChartData[0].percentage.toFixed(0)}%
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {boulderPieChartData[0].label}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <FlatList
        data={boulderPieChartData}
        contentContainerStyle={{
          alignItems: "center",
          marginLeft: 25,
        }}
        numColumns={2}
        keyExtractor={(item) => item.x}
        renderItem={renderLegendComponent}
      />
    </View>
  );
};

export default BoulderPieChart;
