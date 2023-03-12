import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  Pressable,
  Text,
  View,
} from "react-native";
import PhotosResponse from "../../models/photosResponse";
import { styles } from "./SinglePost.style";
import { FontAwesome } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { ScalingDot } from "react-native-animated-pagination-dots";
import { Video } from "expo-av";

interface SinglePostProps {
  items: string[];
  username: string;
  caption: string;
  isLiked: boolean;
  type: string;
  shouldPlay: boolean;
}

function SinglePost({
  items,
  username,
  caption,
  isLiked,
  type,
  shouldPlay,
}: SinglePostProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [postLiked, setPostLiked] = useState<boolean>(isLiked);
  const screenWidth = Dimensions.get("window").width;

  function togglePostLiked() {
    setPostLiked(!postLiked);
  }

  return (
    <View style={styles.post}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
        <Entypo name="dots-three-horizontal" size={16} color="black" />
      </View>
      {type === "video" ? (
        <Video
          resizeMode="cover"
          source={{ uri: items[0] }}
          style={[styles.image, { width: screenWidth }]}
          shouldPlay={shouldPlay}
          isLooping
        />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          data={items}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item }: any) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item }}
                style={[styles.image, { width: screenWidth }]}
              />
            </View>
          )}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />
      )}
      <View style={styles.icons}>
        <View style={styles.iconsLeft}>
          {postLiked ? (
            <Pressable onPress={togglePostLiked}>
              <FontAwesome name="heart" size={24} color="black" />
            </Pressable>
          ) : (
            <Pressable onPress={togglePostLiked}>
              <FontAwesome name="heart-o" size={24} color="black" />
            </Pressable>
          )}
          <FontAwesome
            name="comment-o"
            size={24}
            color="black"
            style={{ marginLeft: scale(16) }}
          />
          <FontAwesome
            name="share"
            size={24}
            color="black"
            style={{ marginLeft: scale(16) }}
          />
        </View>
        {type === "photo" && (
          <ScalingDot
            data={items}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 4,
              height: 4,
              backgroundColor: "#125688",
              borderRadius: 5,
              marginRight: 0,
            }}
            containerStyle={{
              left: "50%",
              top: "85%",
            }}
          />
        )}
        <FontAwesome name="bookmark-o" size={24} color="black" />
      </View>
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
}

export default SinglePost;
