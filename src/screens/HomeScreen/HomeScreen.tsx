import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import SinglePost from "../../components/SinglePost/SinglePost";
import { PhotosWithTotalResults, ErrorResponse, Photo } from "pexels";
import { styles } from "./HomeScreen.style";
import { AntDesign } from "@expo/vector-icons";
import { getPhotos } from "../../services/pexelService";
import Header from "../../components/Header/Header";
import { verticalScale } from "react-native-size-matters";

interface HomeScreenProps {}

function HomeScreen({}: HomeScreenProps) {
  const [photos, setPhotos] = useState<Photo[]>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await getPhotos();
    if (photos !== undefined) {
      setPhotos([...photos, ...response.photos]);
    } else {
      [setPhotos(response.photos)];
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleEndReached = () => {
    if (!loading) {
      setPage((page) => page + 1);
    }
  };

  return (
    <SafeAreaView style={styles.listContainer}>
      <Header />
      <FlatList
        style={styles.postsList}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, index }: any) => (
          <View
            style={[
              styles.postContainer,
              index !== 0 ? { marginTop: verticalScale(24) } : {},
            ]}
          >
            <SinglePost
              image={item.src.medium}
              username={item.photographer}
              caption={item.alt}
              isLiked={item.liked}
            />
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      {loading && (
        <View style={styles.loading}>
          <AntDesign name="loading1" size={24} color="black" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
