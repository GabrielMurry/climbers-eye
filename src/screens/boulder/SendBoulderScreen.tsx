import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import SendHeader from "../../components/boulder/send/SendHeader";
import SendBody from "../../components/boulder/send/SendBody";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SendBoulderScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "SendBoulder"
>;

const SendBoulderScreen: React.FC<SendBoulderScreenProps> = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { boulder, userSendsData } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
      }}
    >
      <SendHeader />
      <ScrollView>
        <SendBody boulder={boulder} userSendsData={userSendsData} />
      </ScrollView>
    </View>
  );
};

export default SendBoulderScreen;
