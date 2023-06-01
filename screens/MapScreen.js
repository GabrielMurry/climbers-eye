import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { ArrowLeftCircleIcon, PlusIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_GEOCODER_API_KEY } from "@env";
import { request } from "../api/requestMethods";
import GymCard from "../components/GymCard";
import {
  setGymName,
  setSpraywallName,
  setSpraywallID,
  setDefaultImageUri,
  setDefaultImageWidth,
  setDefaultImageHeight,
} from "../redux/actions";

// Initialize the module (needs to be done only once)
Geocoder.init(GOOGLE_MAPS_GEOCODER_API_KEY); // use a valid API key

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { gymName } = useSelector((state) => state.gymReducer);
  const { userID } = useSelector((state) => state.userReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState(null);
  const [gymMarker, setGymMarker] = useState({
    id: null,
    name: null,
    address: null,
    latitude: null,
    longitude: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef(null);

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
        .catch((error) => {
          console.warn(error);
          reject(error);
        });
    });
  };

  const handleGymCardPress = async (gym) => {
    const geoLocation = await getGeoLocation(gym);
    const gymData = {
      id: gym.id,
      name: gym.name,
      address: gym.location,
      latitude: geoLocation.lat,
      longitude: geoLocation.lng,
    };
    setGymMarker(gymData);
    animateToRegion(geoLocation);
    setSearchQuery("");
    Keyboard.dismiss();
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
    setIsLoading(true);
    const response = await request("put", `choose_gym/${userID}/${gymID}`);
    if (response.status !== 200) {
      console.log(response.status);
      setIsLoading(false);
      return;
    }
    if (response.data) {
      dispatch(setGymName(response.data.gymName));
      dispatch(setSpraywallName(response.data.spraywallName));
      dispatch(setSpraywallID(response.data.spraywallID));
      dispatch(setDefaultImageUri(response.data.imageUri));
      dispatch(setDefaultImageWidth(response.data.imageWidth));
      dispatch(setDefaultImageHeight(response.data.imageHeight));
      setIsLoading(false);
      navigation.navigate("Home");
    }
  };

  const handleCancelPress = () => {
    setSearchQuery("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.mapContainer}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputAndButton}>
          <TextInput
            style={styles.searchInput(searchQuery)}
            value={searchQuery}
            // onChange doesn't exist in react native. use onChangeText
            onChangeText={(value) => setSearchQuery(value)} // in react native, you don't have to do e.target.value
            placeholder="Search Gyms or Home Walls"
          />
          {searchQuery !== "" ? (
            <TouchableOpacity onPress={handleCancelPress}>
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>
      </View>
      {searchQuery !== "" ? (
        <View style={styles.gymListContainer}>
          <View style={styles.gymList}>
            <FlatList
              contentContainerStyle={{ gap: 10 }}
              data={gyms}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleGymCardPress(item)}>
                  <GymCard gym={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      ) : (
        ""
      )}
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
        {gymMarker.id && (
          <Marker
            coordinate={{
              latitude: gymMarker.latitude,
              longitude: gymMarker.longitude,
            }}
          >
            <Callout style={styles.calloutContainer}>
              <View style={styles.calloutContent}>
                <View style={styles.gymInfo}>
                  <Text style={styles.gymName}>{gymMarker.name}</Text>
                  <Text style={styles.gymAddress}>{gymMarker.address}</Text>
                </View>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => handleConfirmMyGymPress(gymMarker.id)}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.okButtonText}>OK</Text>
                  )}
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      <View style={styles.addGymContainer}>
        <View style={styles.addGymTextAndButtonContainer}>
          <Text>Don't see your gym or home wall?</Text>
          <TouchableOpacity
            style={styles.addGymButton}
            onPress={() => navigation.navigate("AddGym")}
          >
            <PlusIcon size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    position: "absolute",
    zIndex: 2,
  },
  searchInputAndButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "90%",
    backgroundColor: "#FFFBF1",
    padding: 10,
    borderRadius: 10,
    // adding shadow to search input
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  searchInput: (searchQuery) => ({
    width: searchQuery === "" ? "100%" : "85%",
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    // adding shadow to search input
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  }),
  calloutContainer: {
    width: 200,
  },
  calloutContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  gymInfo: {
    flex: 1,
    marginRight: 10,
  },
  gymName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  gymAddress: {
    fontSize: 14,
    color: "gray",
  },
  okButton: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  okButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  gymListContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    paddingTop: 75,
  },
  gymList: {
    width: "90%",
    height: "80%",
    padding: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    // adding shadow to search input
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  addGymContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    paddingBottom: 70,
    position: "absolute",
    zIndex: 2,
    // adding shadow to add gym container
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Required for Android
  },
  addGymTextAndButtonContainer: {
    width: 300,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
  },
  addGymButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 30,
    width: 30,
    borderRadius: 5,
  },
});
