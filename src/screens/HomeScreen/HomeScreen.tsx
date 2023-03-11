import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  Text,
  View,
  ViewToken,
} from "react-native";
import SinglePost from "../../components/SinglePost/SinglePost";
import { styles } from "./HomeScreen.style";
import { AntDesign } from "@expo/vector-icons";
import { getFeed } from "../../services/pexelService";
import Header from "../../components/Header/Header";
import { verticalScale } from "react-native-size-matters";
import FeedItem from "../../models/feedObjects";

interface HomeScreenProps {}

function HomeScreen({}: HomeScreenProps) {
  const [items, setItems] = useState<FeedItem[]>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldAutoplay, setShouldAutoplay] = useState<number[]>([]);

  const fetchData = async () => {
    const response = await getFeed(page);
    setLoading(true);
    if (items !== undefined) {
      setItems([...items, ...response]);
    } else {
      setItems(response);
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

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
      const visibleItems = info.viewableItems.map(
        (entry, index) => entry.item.id
      );
      setShouldAutoplay(visibleItems);
    },
    []
  );
  return (
    <SafeAreaView style={styles.listContainer}>
      <Header />
      <FlatList
        style={styles.postsList}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        data={items}
        onViewableItemsChanged={onViewableItemsChanged}
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
              type={item.type}
              items={item.items}
              username={item.user}
              caption={item.description}
              isLiked={item.liked}
              shouldPlay={shouldAutoplay.includes(item.id)}
            />
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1}
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
