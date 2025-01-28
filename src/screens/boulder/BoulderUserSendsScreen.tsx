import { FlatList, SafeAreaView } from "react-native";
import React from "react";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import UserSendsHeader from "../../components/boulder/userSends/UserSendsHeader";
import UserSendCard from "../../components/boulder/userSends/UserSendCard";

type BoulderUserSendsScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "BoulderUserSends"
>;

const BoulderUserSendsScreen: React.FC<BoulderUserSendsScreenProps> = ({
  route,
}) => {
  const { userSendsData } = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <UserSendsHeader />
      <FlatList
        data={userSendsData}
        renderItem={({ item }) => <UserSendCard sentBoulder={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
};

export default BoulderUserSendsScreen;
