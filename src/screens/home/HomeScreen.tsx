import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BoulderCard from "../../components/common/BoulderCard";
import { useBoulderData } from "../../hooks/useBoulderData";
import SearchAndFilters from "../../components/home/SearchAndFilters";
import Footer from "../../components/common/flatList/Footer";
import FlatListSpraywalls from "../../components/home/FlatListSpraywalls";
import HomeHeader from "../../components/home/HomeHeader";
import Empty from "../../components/common/flatList/Empty";
import { useAppSelector } from "../../redux/hooks";
import { selectSpraywalls } from "../../redux/features/spraywall/spraywallSelectors";
import {
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Mask,
  RuntimeShader,
  Skia,
  useImage,
} from "@shopify/react-native-skia";
import { Image } from "expo-image";
import Svg, { Rect } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";

const SCREEN_WIDTH = Dimensions.get("window").width;

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

  const spraywalls = useAppSelector((state) => selectSpraywalls(state));
  const [opacity, setOpacity] = useState(0.5);

  const imageMask = useImage(require("../../../images/test1.png"));
  const photo = useImage(require("../../../images/photo.jpg"));

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
      {/* <View style={{ flex: 1, backgroundColor: "black" }}>
        <Image
          source={require("../../../images/photo.jpg")}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.5,
          }}
        />
        <MaskedView
          style={{ position: "absolute", width: "100%", height: "100%" }}
          maskElement={
            <Image
              source={require("../../../images/test1.png")}
              style={{
                width: "100%",
                height: "100%",
                opacity: 1,
              }}
            />
          }
        >
          <Image
            source={require("../../../images/photo.jpg")}
            style={{
              width: "100%",
              height: "100%",
              opacity: 1,
            }}
          />
        </MaskedView>
        <Image
          source={require("../../../images/test1.png")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            opacity: 0,
          }}
        />
      </View> */}
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
