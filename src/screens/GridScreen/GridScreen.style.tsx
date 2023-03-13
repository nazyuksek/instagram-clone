import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  gridScreen: {},
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: scale(16),
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#DBDBDB",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(8),
    borderRadius: 4,
    marginTop: verticalScale(16),
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#FAFAFA",
  },
  postsList: {
    marginTop: verticalScale(16),
  },
  postContainer: {},
  barAndButton: {
    position: "relative",
    width: "100%",
  },
  searchButton: {
    position: "absolute",
    top: "40%",
    right: "2%",
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(5),
    borderRadius: 4,
  },
  searchText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
  },
  errorContainer: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(16),
  },
  errorText: {
    fontWeight: "500",
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
  },
});
