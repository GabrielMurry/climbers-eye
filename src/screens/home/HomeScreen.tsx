import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import BoulderCard from "../../components/common/BoulderCard";
import { useBoulderData } from "../../hooks/useBoulderData";
import Footer from "../../components/common/flatList/Footer";
import Empty from "../../components/common/flatList/Empty";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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

  const insets = useSafeAreaInsets();

  return (
    // <SafeAreaView style={styles.container}>
    //   <HomeHeader />
    //   <FlatListSpraywalls
    //     highlight={true}
    //     hasEditPermission={hasEditPermission}
    //     height={100}
    //   />
    <View style={{ paddingTop: insets.top }}>
      <FlatList
        data={boulders}
        renderItem={({ item }) => <BoulderCard boulder={item} />}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
        onEndReached={nextPageBoulders}
        onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
        ListFooterComponent={<Footer isLoading={isNextPageLoading} />}
        ListEmptyComponent={<Empty isLoading={isInitialPageLoading} />}
        onRefresh={refreshBoulders}
        refreshing={isInitialPageLoading}
        style={{ backgroundColor: "white", paddingHorizontal: 10 }}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
});
