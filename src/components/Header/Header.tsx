import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./Header.style";
import { Feather } from "@expo/vector-icons";

interface HeaderProps {
  navigation: any;
  redirectionScreen: string;
}

function Header({ navigation, redirectionScreen }: HeaderProps) {
  function handleSearchPressed() {
    navigation.navigate(redirectionScreen);
  }
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/png/logo.png")}
        />
      </View>
      <Pressable onPress={handleSearchPressed}>
        <Feather name="search" size={24} color="black" />
      </Pressable>
    </View>
  );
}

export default Header;
