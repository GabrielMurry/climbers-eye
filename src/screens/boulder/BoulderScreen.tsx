import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Text,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FullScreenImage from "../../components/image/FullScreenImage";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import useCustomHeader from "../../hooks/useCustomHeader";
import ModalOptions from "../../components/custom/ModalOptions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getBoulderDetail } from "../../services/boulder/boulder";
import { deleteBoulderAPI } from "../../services/boulder/boulder";
import { updateBoulderAPI } from "../../services/boulder/boulder";
import {
  deleteBoulder,
  updateBoulder,
} from "../../redux/features/boulder/boulderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/user/userSelectors";
import { selectBoulder } from "../../redux/features/boulder/boulderSelectors";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { Options, UserSendsData } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "../../components/boulder/detail/Header";
import Body from "../../components/boulder/detail/Body";
import Footer from "../../components/boulder/detail/Footer";

export type ChartData = {
  label: string;
  value: number;
};

type BoulderScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "Boulder"
>;

const THEME_STYLE = "white"; //rgba(245,245,245,255)

const BoulderScreen: React.FC<BoulderScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const boulderId = route.params.boulderId;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUser(state));

  const boulder = useAppSelector((state) => selectBoulder(state, boulderId));
  if (!boulder) {
    console.error("Boulder not found.");
    return <Text>Boulder not found</Text>;
  }

  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [optionsData, setOptionsData] = useState<Options[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [userSendsData, setUserSendsData] = useState<UserSendsData[]>([]);

  const fetchBoulderDetail = async () => {
    const path = { boulderId: boulder.id };
    const response = await getBoulderDetail(path);
    setChartData(response.data.boulderBarChartData);
    setUserSendsData(response.data.userSendsData);
    dispatch(updateBoulder(boulder.id, response.data));
  };

  useFocusEffect(
    useCallback(() => {
      fetchBoulderDetail();
    }, [])
  );

  const headerRight = (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <EllipsisHorizontalIcon size={35} color={"black"} />
    </TouchableOpacity>
  );

  useCustomHeader({
    title: "",
    headerRight,
  });

  const handleDeleteBoulder = () => {
    Alert.alert(
      "Delete Boulder",
      `Are you sure you want to delete "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const pathParams = { boulderId: boulder.id };
            const response = await deleteBoulderAPI(pathParams);
            if (response.status === 204) {
              navigation.goBack();
              dispatch(deleteBoulder(boulder.id));
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleReportPress = () => {
    setIsModalVisible(false);
    // navigation.navigate("ReportBoulder");
  };

  const handlePublishBoulder = () => {
    Alert.alert(
      "Publish Boulder",
      `Are you sure you want to publish "${boulder.name}"?`,
      [
        { text: "Cancel" },
        {
          text: "Publish",
          onPress: async () => {
            const data = { publish: true };
            const pathParams = { boulderId: boulder.id };
            const response = await updateBoulderAPI(pathParams, data);
            if (response.status === 200) {
              navigation.goBack();
              dispatch(updateBoulder(boulder.id, { publish: true }));
            }
          },
          style: "default",
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const createOptionsData = () => {
      // start with options
      const options = [
        // { title: "Share", onPress: () => shareInfo(boulder) },
        // { title: "Report", onPress: handleReportPress },
        {
          title: "Cancel",
          onPress: () => setIsModalVisible(false),
          color: "gray",
        },
      ];
      // If your boulder is not published, add option to publish boulder
      if (!boulder.publish && boulder.setter === user.username) {
        options.unshift({
          title: "Publish Boulder",
          onPress: handlePublishBoulder,
          color: "blue",
        });
      }
      // If you are the setter of a boulder, give option to delete boulder
      if (boulder.setter === user.username) {
        const deleteBoulderOption = {
          title: "Delete Boulder",
          onPress: handleDeleteBoulder,
          color: "red",
        };
        const cancelOptionIndex = options.length - 1;
        options.splice(cancelOptionIndex, 0, deleteBoulderOption);
      }

      return options;
    };

    setOptionsData(createOptionsData());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header boulder={boulder} />
        <Body
          boulder={boulder}
          chartData={chartData}
          userSendsData={userSendsData}
          user={user}
          setImageFullScreen={setImageFullScreen}
        />
        <Footer boulder={boulder} />
        {/* empty view cushion */}
        <View style={{ height: 50 }} />
      </ScrollView>
      <ModalOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        optionsData={optionsData}
      />
      <FullScreenImage
        imageFullScreen={imageFullScreen}
        url={boulder?.url}
        width={boulder?.width}
        height={boulder?.height}
        onRequestClose={() => setImageFullScreen(false)}
      />
    </View>
  );
};

export default BoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_STYLE,
  },
});
