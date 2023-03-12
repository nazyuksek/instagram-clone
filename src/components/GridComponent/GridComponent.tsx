import React from "react";
import { Image, View } from "react-native";
import { Video } from "expo-av";
import { styles } from "./GridComponent.style";

interface GridComponentProps {
  items: string[];
  type: string;
  shouldPlay: boolean;
}

function GridComponent({ items, type, shouldPlay }: GridComponentProps) {
  return (
    <View>
      {type === "video" ? (
        <Video
          source={{ uri: items[0] }}
          style={styles.image}
          shouldPlay={shouldPlay}
          isLooping
        />
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: items[0] }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

export default GridComponent;
