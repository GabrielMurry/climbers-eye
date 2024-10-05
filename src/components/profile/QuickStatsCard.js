import { View, Text } from "react-native";
import React from "react";
import { ChartPieIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native-gesture-handler";

const QuickStatsCard = ({
  section,
  logbookData,
  creationsData,
  likesData,
  bookmarksData,
  circuitsData,
}) => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {section === "logbook" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Sends</Text>
            <Text style={{ fontSize: 24 }}>{logbookData.sends}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>{logbookData.flashes}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>{logbookData.topGrade}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <ChartPieIcon size={30} color={"rgb(0, 122, 255)"} />
            </TouchableOpacity>
          </View>
        </>
      ) : section === "creations" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Established</Text>
            <Text style={{ fontSize: 24 }}>{creationsData.established}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Projects</Text>
            <Text style={{ fontSize: 24 }}>{creationsData.projects}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Total Sends</Text>
            <Text style={{ fontSize: 24 }}>{creationsData.totalSends}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <ChartPieIcon size={30} color={"rgb(0, 122, 255)"} />
            </TouchableOpacity>
          </View>
        </>
      ) : section === "likes" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Likes</Text>
            <Text style={{ fontSize: 24 }}>{likesData.count}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>{likesData.flashes}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>{likesData.topGrade}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <ChartPieIcon size={30} color={"rgb(0, 122, 255)"} />
            </TouchableOpacity>
          </View>
        </>
      ) : section === "bookmarks" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Bookmarks</Text>
            <Text style={{ fontSize: 24 }}>{bookmarksData.bookmarks}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Flashes</Text>
            <Text style={{ fontSize: 24 }}>{bookmarksData.flashes}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Top Grade</Text>
            <Text style={{ fontSize: 24 }}>{bookmarksData.topGrade}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <ChartPieIcon size={30} color={"rgb(0, 122, 255)"} />
            </TouchableOpacity>
          </View>
        </>
      ) : section === "circuits" ? (
        <>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Circuits</Text>
            <Text style={{ fontSize: 24 }}>{circuitsData.circuits}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <Text>Boulders</Text>
            <Text style={{ fontSize: 24 }}>{circuitsData.bouldersCount}</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "25%",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
              }}
            >
              <ChartPieIcon size={30} color={"rgb(0, 122, 255)"} />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default QuickStatsCard;
