import React, { memo } from "react";
import { Image, View } from "react-native";
import { Video } from "expo-av";
import { styles } from "./GridComponent.style";

interface GridComponentProps {
  items: string[];
  type: string;
  shouldPlay: boolean;
}

const GridComponent = memo(
  ({ items, type, shouldPlay }: GridComponentProps) => {
    return (
      <View>
        {type === "video" ? (
          <Video
            source={{ uri: items[0] }}
            style={styles.image}
            shouldPlay={shouldPlay}
            isLooping
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imageContainer}>
            <Image source={{ uri: items[0] }} style={styles.image} />
          </View>
        )}
      </View>
    );
  }
);

export default GridComponent;
