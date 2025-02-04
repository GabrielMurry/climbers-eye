import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import React from "react";
import BoulderCard from "../../components/common/BoulderCard";
import { useBoulderData } from "../../hooks/useBoulderData";
import SearchAndFilters from "../../components/home/SearchAndFilters";
import Footer from "../../components/common/flatList/Footer";
import FlatListSpraywalls from "../../components/home/FlatListSpraywalls";
import HomeHeader from "../../components/home/HomeHeader";
import Empty from "../../components/common/flatList/Empty";

const HomeScreen = () => {
  const hasEditPermission = true;

  const {
    boulders,
    isInitialPageLoading,
    isNextPageLoading,
    error,
    refreshBoulders,
    nextPageBoulders,
  } = useBoulderData();

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <FlatListSpraywalls
        highlight={true}
        hasEditPermission={hasEditPermission}
        height={100}
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
        ListFooterComponent={<Footer isLoading={isNextPageLoading} />}
        ListEmptyComponent={<Empty isLoading={isInitialPageLoading} />}
        onRefresh={refreshBoulders}
        refreshing={isInitialPageLoading}
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
