import { ScrollView, SafeAreaView } from "react-native";
import React from "react";
import useCustomHeader from "../../hooks/useCustomHeader";
import GymSection from "../../components/gym/GymSection";
import DeleteGym from "../../components/gym/DeleteGym";
import SpraywallSection from "../../components/spraywall/SpraywallSection";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../navigation/types/navigation";

const EditGymScreen = () => {
  useCustomHeader({
    backgroundColor: "rgba(245,245,245,255)",
    title: "Edit Gym",
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "rgba(245,245,245,255)",
          paddingHorizontal: 10,
        }}
      >
        <GymSection />
        <SpraywallSection />
        <DeleteGym />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditGymScreen;
