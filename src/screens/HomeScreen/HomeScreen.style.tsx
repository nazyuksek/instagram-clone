import { Dimensions, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  listContainer: {},
  postsList: {
    height: "100%",
  },
  postContainer: {
    height: screenHeight / 2,
  },
  loading: {
    alignItems: "center",
  },
});
