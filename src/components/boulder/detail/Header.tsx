import { View, Text, StyleSheet } from "react-native";
import React from "react";
import QualityRating from "../QualityRating";
import { Boulder } from "../../../utils/types/boulder";

type HeaderProps = {
  boulder: Boulder;
};

const Header: React.FC<HeaderProps> = ({ boulder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.boulderName}>{boulder.name}</Text>
      {/* Row containing grade and stars */}
      <View style={styles.gradeQualityContainer}>
        <Text style={styles.gradeText}>
          {boulder?.grade ? boulder.grade : "Project"}
        </Text>
        <QualityRating quality={boulder?.quality} size={18} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
    rowGap: 5,
  },
  boulderName: {
    fontWeight: "bold",
    fontSize: 32,
  },
  gradeQualityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gradeText: {
    fontSize: 18,
    marginRight: 8,
  },
});
