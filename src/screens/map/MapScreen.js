import { View, StyleSheet, Keyboard } from "react-native";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import FullScreenImage from "../../components/image/FullScreenImage";
import GymInfoBottomSheet from "../../components/map/GymInfoBottomSheet";
import MapSearchQuery from "../../components/map/MapSearchQuery";
import Map from "../../components/map/Map";
import MapSearchResults from "../../components/map/MapSearchResults";
import { useFocusEffect } from "@react-navigation/native";
import { getGymList, userChooseGym } from "../../services/gym";
import { getSpraywallList } from "../../services/spraywall";
import { setGym } from "../../redux/features/gym/gymSlice";
import { setSpraywalls } from "../../redux/features/spraywall/spraywallSlice";

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gym } = useSelector((state) => state.gym);
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState(null);
  const [gymMarker, setGymMarker] = useState(null);
  const [isLoadingConfirmGym, setIsLoadingConfirmGym] = useState(false);
  const [isLoadingGymInfo, setIsLoadingGymInfo] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState(false);

  const mapRef = useRef(null);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "40%", "90%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    if (index === 1) {
      setSearchQuery("");
    }
  }, []);

  useLayoutEffect(() => {
    // If a user already has gym (and by default then spraywall) add 'goback' to header.
    // If a user is brand new, then they do not have a gym or spraywall, and are immediately directed to this screen (do not add a 'goback' button)
    if (gym.name) {
      navigation.setOptions({
        headerLeft: () => (
          <ArrowLeftCircleIcon
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
        ),
      });
    }
  }, [navigation]);

  // use focus effect specifically for when gym admin user deletes their gym and sent back to map screen. - re-fetches new gym
  useFocusEffect(
    useCallback(() => {
      fetchSearchQueryData();
    }, [searchQuery])
  );

  const fetchSearchQueryData = async () => {
    const response = await getGymList();
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setGyms(response.data);
    }
  };

  const handleGymCardPress = async (gym) => {
    setIsLoadingGymInfo(true);
    let gymData = {
      id: gym.id,
      name: gym.name,
      address: gym.address,
      spraywalls: [],
    };
    if (gym.latitude && gym.longitude) {
      animateToRegion(gym.latitude, gym.longitude);
    }
    bottomSheetRef.current?.snapToIndex(1);
    setSearchQuery("");
    Keyboard.dismiss();
    // when user clicks on gym card, we want to quickly display spraywall default image in bottom sheet
    const pathParams = { gymId: gym.id };
    const response = await getSpraywallList(pathParams);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      gymData.spraywalls = response.data;
    }
    setIsLoadingGymInfo(false);
    setGymMarker(gymData);
  };

  const animateToRegion = (lat, lng) => {
    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
    };
    mapRef.current.animateToRegion(region, 1000);
  };

  const handleConfirmMyGymPress = async (gymID) => {
    setIsLoadingConfirmGym(true);
    const data = {
      gym: gymID,
    };
    const response = await userChooseGym(data);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoadingConfirmGym(false);
      return;
    }
    if (response.data) {
      const { id, name, address, spraywalls } = gymMarker;
      const gym = { id, name, address };
      dispatch(setGym(gym));
      dispatch(setSpraywalls(spraywalls));
      setIsLoadingConfirmGym(false);
      navigation.navigate("Tabs", { screen: "Home" });
    }
  };

  const handleCancelSearchPress = () => {
    // bug in bottom-sheet pkg - can't dismiss keyboard and snap to index at same time
    setTimeout(() => {
      setSearchQuery("");
      bottomSheetRef.current?.snapToIndex(1);
    }, 35);
    Keyboard.dismiss();
  };

  const handleCancelGymPress = () => {
    setGymMarker(null);
    setSearchQuery("");
    bottomSheetRef.current?.snapToIndex(1);
  };

  return (
    <View style={styles.mapContainer}>
      {/* map view */}
      <Map
        mapRef={mapRef}
        gymMarker={gymMarker}
        handleConfirmMyGymPress={handleConfirmMyGymPress}
        isLoadingConfirmGym={isLoadingConfirmGym}
      />
      {/* bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles.bottomSheetContainer}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
      >
        <View style={styles.bottomSheet}>
          {gymMarker ? (
            // bottom sheet of selected gym - gym's info shown (map search query is not. Press 'x' to cancel the gym marker and remove gym info in replace of the map search query)
            <GymInfoBottomSheet
              gymMarker={gymMarker}
              isLoadingGymInfo={isLoadingGymInfo}
              handleCancelGymPress={handleCancelGymPress}
              handleConfirmMyGymPress={handleConfirmMyGymPress}
              // setImageFullScreen={setImageFullScreen}
              isLoadingConfirmGym={isLoadingConfirmGym}
            />
          ) : (
            // bottom sheet search query
            <>
              <MapSearchQuery
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleCancelSearchPress={handleCancelSearchPress}
              />
              <MapSearchResults
                searchQuery={searchQuery}
                navigation={navigation}
                gyms={gyms}
                handleGymCardPress={handleGymCardPress}
              />
            </>
          )}
        </View>
      </BottomSheet>
      {/* <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={gymMarker ? gymMarker.spraywalls[0].url : null}
        width={gymMarker ? gymMarker.spraywalls[0].width : null}
        height={gymMarker ? gymMarker.spraywalls[0].height : null}
        onRequestClose={() => setImageFullScreen(false)}
      /> */}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  bottomSheetContainer: {
    backgroundColor: "rgb(250, 249, 246)", // off white
  },
  bottomSheet: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
});
