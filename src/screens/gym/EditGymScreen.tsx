import { ScrollView, SafeAreaView } from "react-native";
import React from "react";
import GymSection from "../../components/gym/GymSection";
import DeleteGym from "../../components/gym/DeleteGym";
import SpraywallSection from "../../components/spraywall/SpraywallSection";
import EditGymHeader from "../../components/gym/EditGymHeader";

const EditGymScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <EditGymHeader />
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
