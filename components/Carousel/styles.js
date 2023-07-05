import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: "100%",
    minHeight: 425,
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
    bottom: 5,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 18,
  },
});

export default styles;
