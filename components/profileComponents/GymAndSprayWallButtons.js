import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";

const GymAndSprayWallButtons = ({ setIsModalVisible, data }) => {
  const renderImageCards = ({ item }) => {
    return (
      <Image
        source={{ uri: item.url }}
        style={{ width: 65, height: 65, borderRadius: 10 }}
      />
    );
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <View
        style={{
          width: "90%",
          gap: 20,
        }}
      >
        {/* Statistics Button */}
        <View
          style={{
            backgroundColor: "#FFFBF1",
            height: 75,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              flex: 1,
              justifyContent: "space-evenly",
            }}
            onPress={() => setIsModalVisible(true)}
          >
            <View style={{ flexDirection: "row" }}>
              {data.map((item, index) => (
                <React.Fragment key={item.gymID}>
                  {index > 0 && <Text style={{ marginHorizontal: 5 }}>|</Text>}
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ flexShrink: 1 }}
                  >
                    {item.gymName}
                  </Text>
                </React.Fragment>
              ))}
            </View>
            <View style={{ flexDirection: "row" }}>
              {data.map((item, index) => (
                <React.Fragment key={item.gymID}>
                  {index > 0 && <Text style={{ marginHorizontal: 5 }}>|</Text>}
                  {item.spraywalls.map((spraywall, innerIndex) => (
                    <React.Fragment key={spraywall.spraywallID}>
                      {innerIndex > 0 && (
                        <Text style={{ marginHorizontal: 5 }}>|</Text>
                      )}
                      <Text numberOfLines={1} ellipsizeMode="tail">
                        {spraywall.spraywallName}
                      </Text>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
            }}
          >
            <FlatList
              data={data.reduce(
                (acc, item) => [...acc, ...item.spraywalls], // reduce method on the data array to flatten the nested spraywalls arrays from each object in the data array into a single array
                []
              )}
              renderItem={renderImageCards}
              keyExtractor={(spraywall) => spraywall.spraywallID}
              horizontal // Set this to true to make the items scroll horizontally
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 5,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GymAndSprayWallButtons;
