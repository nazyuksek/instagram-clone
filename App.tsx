import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationProvider } from "./src/context/AuthenticationContext";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthenticationProvider>
        <Navigation />
      </AuthenticationProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
