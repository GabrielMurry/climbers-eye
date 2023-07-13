// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   StyleSheet,
//   Image,
//   Alert,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import React, { useState } from "react";
// import { request } from "../api/requestMethods";
// import { useDispatch } from "react-redux";
// import { setSpraywalls } from "../redux/actions";

// const EditSprayWallScreen = ({ route, navigation }) => {
//   const dispatch = useDispatch();
//   const { id, name, url, width, height } = route.params.spraywall;
//   const [sprayWallName, setSprayWallName] = useState(name);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDelete = async () => {
//     Alert.alert(
//       "Delete Circuit",
//       `Are you sure you want to delete "${name}"?`,
//       [
//         {
//           text: "Cancel",
//         },
//         {
//           text: "Delete",
//           onPress: async () => {
//             setIsLoading(true);
//             const response = await request("delete", `delete_spraywall/${id}`);
//             if (response.status !== 200) {
//               console.log(response.status);
//               setIsLoading(false);
//               return;
//             }
//             dispatch(setSpraywalls(response.data.spraywalls));
//             console.log("successfully deleted spraywall:", id);
//             setIsLoading(false);
//             navigation.goBack();
//           },
//           style: "destructive",
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <View style={{ padding: 10 }}>
//         <View style={[styles.inputAndAddContainer, { height: "15%" }]}>
//           <Text style={styles.label}>Spray Wall Name:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter spray wall name"
//             value={sprayWallName}
//             onChangeText={(text) => setSprayWallName(text)}
//           />
//         </View>
//         <Image
//           source={{ uri: url }}
//           style={{
//             width: "100%",
//             height: "70%",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           resizeMode="contain"
//         />
//         <View style={{ height: "15%", justifyContent: "center" }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: "rgb(255, 59, 48)",
//               borderRadius: 5,
//               width: "100%",
//               height: 45,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             onPress={handleDelete}
//           >
//             {isLoading ? (
//               <ActivityIndicator />
//             ) : (
//               <Text
//                 style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
//               >
//                 Delete
//               </Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default EditSprayWallScreen;

// const styles = StyleSheet.create({
//   addNewSprayWallContainer: {
//     alignSelf: "stretch",
//     alignItems: "center",
//     flex: 1,
//     padding: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     fontSize: 16,
//   },
//   imageContainer: {
//     width: "100%",
//     flex: 1,
//     padding: 10,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     flexDirection: "row",
//   },
//   imageButton: {
//     width: 150,
//     height: 150,
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   imageButtonText: {
//     fontSize: 16,
//   },
//   inputAndAddContainer: {
//     alignSelf: "stretch",
//   },
// });

import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import SettingsButton from "../components/editGymComponents/SettingsButton";
import { useSelector } from "react-redux";

const EditSprayWallScreen = ({ navigation, route }) => {
  const { spraywalls } = useSelector((state) => state.spraywallReducer);
  const index = route?.params?.index;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {spraywalls[index].name}
        </Text>
      ),
      headerStyle: {
        backgroundColor: "rgba(245,245,245,255)", // Set your desired color here
      },
    });
  }, [navigation, spraywalls]);

  const handleEditItemPressed = (item) => {
    navigation.navigate("Edit", { item });
  };

  const SPRAY_WALL_DATA = [
    {
      id: 1,
      title: "Spray Wall Name",
      spraywall: spraywalls[index],
    },
    {
      id: 2,
      title: "Spray Wall Image",
      spraywall: spraywalls[index],
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(245,245,245,255)",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>Spray Wall</Text>
      </View>
      <View style={{ backgroundColor: "white", borderRadius: 5 }}>
        {SPRAY_WALL_DATA.map((item) => (
          <SettingsButton
            key={item.id}
            title={item.title}
            onPress={() => handleEditItemPressed(item)}
          />
        ))}
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 14, color: "red" }}>Delete</Text>
      </View>
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 5,
        }}
      >
        <SettingsButton
          title={"Delete Spray Wall"}
          textColor="white"
          destructive={true}
        />
      </View>
    </View>
  );
};

export default EditSprayWallScreen;
