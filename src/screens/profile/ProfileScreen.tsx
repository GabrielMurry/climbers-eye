import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import BouldersSection from "../../components/profile/BouldersSection";
import CircuitsSection from "../../components/profile/CircuitsSection";
import GymSection from "../../components/profile/GymSection";
import ProfileHeader from "../../components/profile/ProfileHeader";

const BG_COLOR = "rgba(245,245,245,255)";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
      >
        <ProfileHeader />
        <GymSection />
        <BouldersSection />
        <CircuitsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
