import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: "100%",
    // minHeight: 425,
    aspectRatio: 1,
    minWidth: "95%",
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#FFFBF1",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  bullets: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 24,
  },
});

export default styles;
