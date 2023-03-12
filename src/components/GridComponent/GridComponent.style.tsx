import { Dimensions, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  imageContainer: {},
  image: {
    height: screenHeight / 5,
    width: screenWidth / 4,
    borderWidth: 1,
    borderColor: "#fff",
    resizeMode: "cover",
  },
});
