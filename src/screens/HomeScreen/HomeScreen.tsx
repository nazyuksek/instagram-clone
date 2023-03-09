import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, SafeAreaView, Text, View } from "react-native";
import SinglePost from "../../components/SinglePost/SinglePost";
import { getPhotos } from "../../services/PexelService";
import { PhotosWithTotalResults, ErrorResponse, Photo } from "pexels";
import { styles } from "./HomeScreen.style";

interface HomeScreenProps {}

function HomeScreen({}: HomeScreenProps) {
  const [photos, setPhotos] = useState<Photo[]>();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      await getPhotos().then((res) => {
        setPhotos(res.photos);
        console.log(res.photos[0].photographer_id);
      });
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        style={styles.postsList}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        data={photos}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item }: any) => (
          <View style={styles.postContainer}>
            <SinglePost
              image={item.src.medium}
              username={item.photographer}
              caption={item.alt}
              photographerId={item.photographer_id}
            />
          </View>
        )}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
