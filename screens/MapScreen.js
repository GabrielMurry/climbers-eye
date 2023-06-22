import { View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView from "react-native-maps";
import {
  ArrowLeftCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_GEOCODER_API_KEY } from "@env";
import { request } from "../api/requestMethods";
import GymCard from "../components/GymCard";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {
  setGymName,
  setSpraywallName,
  setSpraywallID,
  setDefaultImageUri,
  setDefaultImageWidth,
  setDefaultImageHeight,
} from "../redux/actions";
import FullScreenImage from "../components/FullScreenImage";
import GymMapMarker from "../components/mapComponents/GymMapMarker";
import GymInfoBottomSheet from "../components/mapComponents/GymInfoBottomSheet";
import { Text } from "react-native";
import GymBottomSheetSearchResult from "../components/mapComponents/GymBottomSheetSearchResult";
import GymBottomSheetSearchEmpty from "../components/mapComponents/GymBottomSheetSearchEmpty";

// Initialize the module (needs to be done only once)
Geocoder.init(GOOGLE_MAPS_GEOCODER_API_KEY); // use a valid API key

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gymName } = useSelector((state) => state.gymReducer);
  const { userID } = useSelector((state) => state.userReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState(null);
  const [gymMarker, setGymMarker] = useState(null);
  const [isLoadingConfirmGym, setIsLoadingConfirmGym] = useState(false);
  const [isLoadingGymInfo, setIsLoadingGymInfo] = useState(false);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
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
    if (gymName) {
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

  useEffect(() => {
    if (searchQuery) {
      fetchSearchQueryData();
    }
  }, [searchQuery]);

  const fetchSearchQueryData = async () => {
    const response = await request("get", `query_gyms/?search=${searchQuery}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      setGyms(response.data);
    }
  };

  const getGeoLocation = async (gym) => {
    // Search by address
    return new Promise((resolve, reject) => {
      Geocoder.from(gym.location)
        .then((json) => {
          const location = json.results[0].geometry.location;
          resolve(location);
        })
        .catch(() => {
          // invalid location address
          resolve(false);
        });
    });
  };

  const handleGymCardPress = async (gym) => {
    setIsLoadingGymInfo(true);
    let gymData = {
      id: gym.id,
      name: gym.name,
      address: gym.location,
    };
    if (gym.location !== "") {
      const geoLocation = await getGeoLocation(gym);
      // if received a valid geoLocation (valid location address)
      if (geoLocation) {
        gymData.latitude = geoLocation.lat;
        gymData.longitude = geoLocation.lng;
        animateToRegion(geoLocation);
      }
    }
    bottomSheetRef.current?.snapToIndex(1);
    setSearchQuery("");
    Keyboard.dismiss();
    // when user clicks on gym card, we want to quickly display spraywall default image in bottom sheet
    const response = await request("get", `queried_gym_spraywall/${gym.id}`);
    if (response.status !== 200) {
      console.log(response.status);
      return;
    }
    if (response.data) {
      gymData.spraywallImageUri = response.data.imageUri;
      gymData.spraywallImageWidth = response.data.imageWidth;
      gymData.spraywallImageHeight = response.data.imageHeight;
    }
    setIsLoadingGymInfo(false);
    setGymMarker(gymData);
  };

  const animateToRegion = (geoLocation) => {
    const region = {
      latitude: geoLocation.lat,
      longitude: geoLocation.lng,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
    };
    mapRef.current.animateToRegion(region, 1000);
  };

  const handleConfirmMyGymPress = async (gymID) => {
    setIsLoadingConfirmGym(true);
    const response = await request("put", `choose_gym/${userID}/${gymID}`);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoadingConfirmGym(false);
      return;
    }
    if (response.data) {
      dispatch(setGymName(response.data.gymName));
      dispatch(setSpraywallName(response.data.spraywallName));
      dispatch(setSpraywallID(response.data.spraywallID));
      dispatch(setDefaultImageUri(response.data.imageUri));
      dispatch(setDefaultImageWidth(response.data.imageWidth));
      dispatch(setDefaultImageHeight(response.data.imageHeight));
      setIsLoadingConfirmGym(false);
      navigation.navigate("Home");
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => handleGymCardPress(item)}>
        <GymCard gym={item} />
      </TouchableOpacity>
    ),
    []
  );

  const handleTextInputFocus = () => {
    setIsTextInputFocused(true);
  };

  const handleTextInputBlur = () => {
    setIsTextInputFocused(false);
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
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 38.575764,
          longitude: -121.478851,
          latitudeDelta: 0.05, // zoom scale
          longitudeDelta: 0.05,
        }}
        style={{ flex: 1 }}
      >
        {gymMarker && (
          <GymMapMarker
            gymMarker={gymMarker}
            handleConfirmMyGymPress={handleConfirmMyGymPress}
            isLoadingConfirmGym={isLoadingConfirmGym}
          />
        )}
      </MapView>
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
            // bottom sheet of selected gym - gym's info shown
            <GymInfoBottomSheet
              gymMarker={gymMarker}
              isLoadingGymInfo={isLoadingGymInfo}
              handleCancelGymPress={handleCancelGymPress}
              handleConfirmMyGymPress={handleConfirmMyGymPress}
              setImageFullScreen={setImageFullScreen}
              isLoadingConfirmGym={isLoadingConfirmGym}
            />
          ) : (
            // bottom sheet search query
            <>
              <View style={styles.bottomSheetSearchInputAndCancelContainer}>
                <View style={styles.bottomSheetSearchInputContainer}>
                  <MagnifyingGlassIcon size={20} color="gray" />
                  <BottomSheetTextInput
                    style={styles.bottomSheetSearchInput}
                    value={searchQuery}
                    // onChange doesn't exist in react native. use onChangeText
                    onChangeText={(value) => setSearchQuery(value)} // in react native, you don't have to do e.target.value
                    placeholder="Search Gyms or Home Walls"
                    onFocus={handleTextInputFocus}
                    onBlur={handleTextInputBlur}
                  />
                  {searchQuery ? (
                    <TouchableOpacity
                      style={styles.resetSearchQuery}
                      onPress={() => setSearchQuery("")}
                    >
                      <XMarkIcon size={12} color={"white"} />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {(isTextInputFocused || searchQuery) && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancelSearchPress}
                  >
                    <Text style={{ color: "rgb(0, 122, 255)" }}>Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>
              {searchQuery ? (
                <GymBottomSheetSearchResult
                  gyms={gyms}
                  renderItem={renderItem}
                />
              ) : (
                <GymBottomSheetSearchEmpty />
              )}
            </>
          )}
        </View>
      </BottomSheet>
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        uri={gymMarker?.spraywallImageUri}
        image={{
          width: gymMarker?.spraywallImageWidth,
          height: gymMarker?.spraywallImageHeight,
        }}
        onRequestClose={() => setImageFullScreen(false)}
      />
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
    paddingHorizontal: 20,
    gap: 10,
  },
  bottomSheetSearchInputAndCancelContainer: {
    flexDirection: "row",
  },
  bottomSheetSearchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(229, 228, 226)",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bottomSheetSearchInput: {
    flex: 1,
    height: 35,
    paddingHorizontal: 5,
    backgroundColor: "rgb(229, 228, 226)",
    borderRadius: 10,
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  resetSearchQuery: {
    backgroundColor: "gray",
    width: 18,
    height: 18,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
