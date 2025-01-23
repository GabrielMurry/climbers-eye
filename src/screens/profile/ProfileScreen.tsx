import { SafeAreaView, ScrollView } from "react-native";
import React from "react";
import BouldersSection from "../../components/profile/BouldersSection";
import CircuitsSection from "../../components/profile/CircuitsSection";
import GymSection from "../../components/profile/GymSection";
import ProfileHeader from "../../components/profile/ProfileHeader";

const THEME_STYLE = "white";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME_STYLE }}>
      <ScrollView>
        <ProfileHeader />
        <GymSection />
        <BouldersSection />
        <CircuitsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
