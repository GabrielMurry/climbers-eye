import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import React, { RefObject, useCallback, useState } from "react";
import GymBottomSheetSearchResult from "./GymBottomSheetSearchResult";
import GymBottomSheetSearchEmpty from "./GymBottomSheetSearchEmpty";
import { Gym } from "../../utils/types/gym";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import GymCard from "../gym/GymCard";
import { MapMarker } from "../../screens/map/MapScreen";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { getSpraywallList } from "../../services/spraywall";
import MapView from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";
import { getGymList } from "../../services/gym";

type MapSearchResultsProps = {
  setMarker: (marker: MapMarker) => void;
  bottomSheetRef: RefObject<BottomSheetMethods>;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  mapRef: RefObject<MapView>;
};

const MapSearchResults: React.FC<MapSearchResultsProps> = ({
  setMarker,
  bottomSheetRef,
  searchQuery,
  setSearchQuery,
  mapRef,
}) => {
  const [gyms, setGyms] = useState<Gym[] | null>(null);

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

  const animateToRegion = (lat: number, lng: number) => {
    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
    };
    mapRef.current?.animateToRegion(region, 1000);
  };

  const handleGymCardPress = async (gym: Gym) => {
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
    setMarker({ gym: gym, spraywalls: response.data });
  };

  const renderItem = useCallback(
    ({ item }: { item: Gym }) => (
      <TouchableOpacity onPress={() => handleGymCardPress(item)}>
        <GymCard gym={item} />
      </TouchableOpacity>
    ),
    []
  );

  return (
    // <>
    //   {gyms ? (
    //     <GymBottomSheetSearchResult
    //       gyms={gyms}
    //       handleGymCardPress={handleGymCardPress}
    //     />
    //   ) : (
    //     <GymBottomSheetSearchEmpty />
    //   )}
    // </>
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{ backgroundColor: "lightgray", height: 1 }} />
      <BottomSheetFlatList
        data={gyms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MapSearchResults;
