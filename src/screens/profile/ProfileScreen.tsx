import { ScrollView, View } from "react-native";
import React from "react";
import BouldersSection from "../../components/profile/BouldersSection";
import CircuitsSection from "../../components/profile/CircuitsSection";
import GymSection from "../../components/profile/GymSection";
import ProfileHeader from "../../components/profile/ProfileHeader";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const BG_COLOR = "rgba(245,245,245,255)";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, backgroundColor: BG_COLOR, paddingTop: insets.top }}
    >
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
      >
        <ProfileHeader />
        <GymSection />
        <BouldersSection />
        <CircuitsSection />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
