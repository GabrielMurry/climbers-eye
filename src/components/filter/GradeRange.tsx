import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import { boulderGrades } from "../../utils/constants/boulderConstants";
import { useAppSelector } from "../../redux/hooks";
import { selectFilters } from "../../redux/features/filter/filterSelectors";
import GradeRangeSliders from "./GradeRangeSliders";

const GradeRange = () => {
  const filters = useAppSelector((state) => selectFilters(state));

  const [gradeSlidersVisible, setGradeSlidersVisible] = useState(false);

  const handleGradeRangePress = () => {
    setGradeSlidersVisible(!gradeSlidersVisible);
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 40,
            justifyContent: "center",
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "rgba(245,245,245,255)",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            Grade Range
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            width: "100%",
            height: 40,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
          onPress={handleGradeRangePress}
        >
          <Text
            style={{
              color: "black",
            }}
          >{`${boulderGrades[filters.minGradeIndex]} - ${
            boulderGrades[filters.maxGradeIndex]
          }`}</Text>
          <CheckIcon size={20} color={"black"} />
        </TouchableOpacity>
      </View>
      <GradeRangeSliders
        boulderGrades={boulderGrades}
        filters={filters}
        isVisible={gradeSlidersVisible}
      />
    </>
  );
};

export default GradeRange;
