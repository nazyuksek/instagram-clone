import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./Header.style";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../../navigation/AppNavigation";

interface HeaderProps {}

function Header({}: HeaderProps) {
  const navigation = useNavigation<AppNavigationProp>();

  function handleSearchPressed() {
    navigation.navigate("GridScreen");
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
