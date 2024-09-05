import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import CustomButton from "../../components/CustomButton";
import { CheckIcon } from "react-native-heroicons/outline";

const ReportBoulderScreen = ({ navigation }) => {
  useCustomHeader({
    navigation,
    title: "Report Boulder",
  });

  const [reportReasons, setReportReasons] = useState([
    { reason: "Inappropriate Name", isSelected: false },
    { reason: "Inappropriate Drawing", isSelected: false },
    { reason: "Spam", isSelected: false },
    { reason: "Other", isSelected: false },
  ]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    // if at least one of the report reasons is selected (true), enable the submit button
    for (let i = 0; i < reportReasons.length; i++) {
      if (reportReasons[i].isSelected) {
        setIsSubmitDisabled(false);
        return;
      }
    }
    setIsSubmitDisabled(true);
  }, [reportReasons]);

  const renderReportReasons = (item) => {
    const handleReportReasonPress = () => {
      setReportReasons((prevReasons) => {
        const newReasons = [...prevReasons];
        const index = prevReasons.findIndex((i) => i.reason === item.reason);
        newReasons[index].isSelected = !newReasons[index].isSelected;
        return newReasons;
      });
    };

    return (
      <Pressable
        key={item.reason}
        style={{
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderColor: "lightgray",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={handleReportReasonPress}
      >
        <Text>{item.reason}</Text>
        {item.isSelected ? (
          <CheckIcon size={17} color={"black"} style={{ marginRight: 10 }} />
        ) : null}
      </Pressable>
    );
  };

  const handleSubmitPress = () => {
    console.log("Submit Report Logic");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>
            We will look into your report and we may contact the setter. Your
            name and information will remain private.
          </Text>
          <View style={{ marginTop: 10 }}>
            {reportReasons.map(renderReportReasons)}
          </View>
        </View>
        <CustomButton
          onPress={handleSubmitPress}
          text="Submit"
          disabled={isSubmitDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReportBoulderScreen;
