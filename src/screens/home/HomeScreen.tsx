import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
  View,
} from "react-native";
import React, { useEffect } from "react";
import BoulderCard from "../../components/common/BoulderCard";
import { useBoulderData } from "../../hooks/useBoulderData";
import SearchAndFilters from "../../components/home/SearchAndFilters";
import Footer from "../../components/common/flatList/Footer";
import FlatListSpraywalls from "../../components/home/FlatListSpraywalls";
import HomeHeader from "../../components/home/HomeHeader";
import Empty from "../../components/common/flatList/Empty";
import { PlusIcon } from "react-native-heroicons/outline";
import { useAppSelector } from "../../redux/hooks";
import { selectCircuits } from "../../redux/features/circuit/circuitSelectors";
import * as AppleAuthentication from "expo-apple-authentication";

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
    // <SafeAreaView style={styles.container}>
    //   <HomeHeader />
    //   <FlatListSpraywalls
    //     highlight={true}
    //     hasEditPermission={hasEditPermission}
    //     height={100}
    //   />
    // <FlatList
    //   data={boulders}
    //   renderItem={({ item }) => <BoulderCard boulder={item} />}
    //   keyExtractor={(item) => item.id.toString()}
    //   keyboardShouldPersistTaps="handled" // click on search bar cancel buttons when Keyboard is visible (or click on boulder cards)
    //   onEndReached={nextPageBoulders}
    //   onEndReachedThreshold={0.2} // represents the number of screen lengths you should be from the bottom before it fires the event
    //   ListFooterComponent={<Footer isLoading={isNextPageLoading} />}
    //   ListEmptyComponent={<Empty isLoading={isInitialPageLoading} />}
    //   onRefresh={refreshBoulders}
    //   refreshing={isInitialPageLoading}
    //   contentInsetAdjustmentBehavior="automatic"
    //   style={{ backgroundColor: "white", paddingHorizontal: 10 }}
    //   contentContainerStyle={{ gap: 5 }}
    // />
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            console.log(credential);
            // signed in
          } catch (e) {
            console.error(e);
            // if (e.code === 'ERR_REQUEST_CANCELED') {
            //   // handle that the user canceled the sign-in flow
            // } else {
            //   // handle other errors
            // }
          }
        }}
      />
    </View>
    // </SafeAreaView>
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
