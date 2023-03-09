import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  post: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: "85%",
  },
  image: {
    width: "100%",
    flex: 1,
  },
  info: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
  },
  username: {
    fontWeight: "700",
    marginRight: 4,
  },
  caption: {
    fontWeight: "300",
    maxWidth: "75%",
  },
});
