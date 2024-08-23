import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import useCustomHeader from "../hooks/useCustomHeader";
import BarChartHorizontal from "../components/boulderStatsComponents/BarChartHorizontal";
import { useSelector } from "react-redux";

const BoulderStatsScreen = ({ route, navigation }) => {
  const { boulder, chartData } = route.params;

  useCustomHeader({
    navigation,
    title: "Boulder Statistics",
  });

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
          {boulder.firstAscent ? boulder.firstAscent : "-"}
        </Text>
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
