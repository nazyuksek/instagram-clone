import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "8%",
  },
  logoContainer: {
    height: "100%",
    width: "40%",
  },
  logo: {
    height: "100%",
    width: "100%",
  },
});
