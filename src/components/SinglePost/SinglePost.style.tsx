import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  post: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  userInfo: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    flexDirection: "row",
  },

  username: {
    fontWeight: "700",
    marginRight: verticalScale(4),
  },
  caption: {
    fontWeight: "300",
    maxWidth: "70%",
  },
  icons: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  iconsLeft: {
    flexDirection: "row",
  },
});
