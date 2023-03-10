import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  listContainer: {},
  postsList: {
    height: "100%",
  },
  postContainer: {
    height: scale(300),
  },
  loading: {
    alignItems: "center",
  },
});
