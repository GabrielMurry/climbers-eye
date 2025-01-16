import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import BoulderCard from "../../components/common/BoulderCard";
import ErrorCard from "../../components/common/ErrorCard";
import ModalOptions from "../../components/custom/ModalOptions";
import { useNavigation } from "@react-navigation/native";
import { useBoulderData } from "../../hooks/useBoulderData";
import Header from "../../components/home/Header";
import SearchAndFilters from "../../components/home/SearchAndFilters";
import Footer from "../../components/home/Footer";
import Empty from "../../components/home/Empty";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const hasEditPermission = true;

  const {
    boulders,
    isInitialPageLoading,
    isNextPageLoading,
    error,
    refreshBoulders,
    nextPageBoulders,
  } = useBoulderData();

  const handleEditGymPress = () => {
    setIsModalVisible(false);
    navigation.navigate("GymStack", { screen: "EditGym" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        setIsModalVisible={setIsModalVisible}
        hasEditPermission={hasEditPermission}
      />
      <FlatList
        data={boulders}
        renderItem={({ item }) => <BoulderCard boulder={item} />}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
        onEndReached={nextPageBoulders}
        onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        ListHeaderComponent={<SearchAndFilters />}
        ListHeaderComponentStyle={{ paddingHorizontal: 20 }}
        ListFooterComponent={() => <Footer isLoading={isNextPageLoading} />}
        ListEmptyComponent={() => <Empty isLoading={isInitialPageLoading} />}
        onRefresh={refreshBoulders}
        refreshing={isInitialPageLoading}
      />
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={[
          { title: "Edit Gym", onPress: handleEditGymPress, color: "black" },
          {
            title: "Cancel",
            onPress: () => setIsModalVisible(false),
            color: "gray",
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
