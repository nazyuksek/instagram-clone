import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  loginScreen: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {},
  logo: {
    height: verticalScale(75),
    width: scale(175),
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#DBDBDB",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(8),
    borderRadius: 4,
    marginTop: verticalScale(16),
    justifyContent: "flex-start",
    width: scale(300),
    backgroundColor: "#FAFAFA",
  },
  button: {
    backgroundColor: "#0095F6",
    width: scale(300),
    paddingVertical: verticalScale(12),
    alignItems: "center",
    borderRadius: 8,
    marginTop: verticalScale(24),
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  passwordInputContainer: {
    position: "relative",
  },
  eyeOff: {
    position: "absolute",
    top: "50%",
    right: "5%",
  },
});
