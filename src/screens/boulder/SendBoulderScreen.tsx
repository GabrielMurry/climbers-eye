import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import SendHeader from "../../components/boulder/send/SendHeader";
import SendBody from "../../components/boulder/send/SendBody";

type SendBoulderScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "SendBoulder"
>;

const SendBoulderScreen: React.FC<SendBoulderScreenProps> = ({ route }) => {
  const { boulder, userSendsData } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(245,245,245,255)" }}>
      <SendHeader />
      <ScrollView>
        <SendBody boulder={boulder} userSendsData={userSendsData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendBoulderScreen;
