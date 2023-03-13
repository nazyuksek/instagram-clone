import React, { memo, Suspense, useState } from "react";
import { View } from "react-native";
import { Video } from "expo-av";
import { styles } from "./GridComponent.style";
import { Image } from "expo-image";

interface GridComponentProps {
  items: string[];
  type?: string;
  shouldPlay?: boolean;
}

const VideoGridItem = memo(({ items, shouldPlay }: GridComponentProps) => {
  return (
    <Video
      source={{ uri: items[0] }}
      style={styles.image}
      shouldPlay={shouldPlay}
      isLooping
      resizeMode="cover"
    />
  );
});

const ImageGridItem = memo(({ items }: GridComponentProps) => {
  return (
    <Image
      source={{ uri: items[0] }}
      style={styles.image}
      contentFit="contain"
      cachePolicy="memory"
    />
  );
});

const GridComponent = ({ items, type, shouldPlay }: GridComponentProps) => {
  return (
    <Suspense>
      <View>
        {type === "video" ? (
          <VideoGridItem shouldPlay={shouldPlay} items={items} />
        ) : (
          <View style={styles.imageContainer}>
            <ImageGridItem items={items} />
          </View>
        )}
      </View>
    </Suspense>
  );
};

export default GridComponent;
