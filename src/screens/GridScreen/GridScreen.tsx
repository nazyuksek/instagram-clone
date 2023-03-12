import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBar from "../../components/BackBar/BackBar";
import { AppNavigationProp } from "../../navigation/AppNavigation";
import { styles } from "./GridScreen.style";
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  ViewToken,
} from "react-native";
import { getFeed } from "../../services/pexelService";
import FeedItem from "../../models/feedObjects";
import { verticalScale } from "react-native-size-matters";
import GridComponent from "../../components/GridComponent/GridComponent";
import { Feather } from "@expo/vector-icons";

interface GridScreenProps {}

function GridScreen({}: GridScreenProps) {
  const navigation = useNavigation<AppNavigationProp>();
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<FeedItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [shouldAutoplay, setShouldAutoplay] = useState<number[]>([]);
  const [error, setError] = useState<boolean>(false);

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
      const visibleItems = info.viewableItems.map((entry) => entry.item.id);
      setShouldAutoplay(visibleItems);
    },
    []
  );

  const fetchData = async () => {
    await getFeed(page, searchText)
      .then((res) => {
        setLoading(true);
        if (items !== undefined) {
          setItems([...items, ...res]);
        } else {
          setItems(res);
        }
        setLoading(false);
      })
      .catch((error) => setError(true));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleEndReached = () => {
    if (!loading) {
      setPage((page) => page + 1);
    }
  };

  async function handleSubmit() {
    await getFeed(page, searchText)
      .then((res) => {
        setLoading(true);
        if (items !== undefined) {
          setItems(res);
        } else {
          setItems(res);
        }
      })
      .catch((error) => {
        setError(true);
      });
  }

  return (
    <SafeAreaView style={styles.gridScreen}>
      <BackBar navigation={navigation} />
      <View style={styles.inputContainer}>
        <View style={styles.barAndButton}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSubmit}
          />
          <View style={styles.searchButton}>
            <Feather name="search" size={24} color="#DBDBDB" />
          </View>
        </View>
      </View>
      <FlatList
        style={styles.postsList}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        data={items}
        numColumns={4}
        key={0}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item }: any) => (
          <View style={styles.postContainer}>
            <GridComponent
              type={item.type}
              items={item.items}
              shouldPlay={shouldAutoplay.includes(item.id)}
            />
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1}
      />
      {error && (
        <View style={{ marginTop: 60, backgroundColor: "red", height: 300 }}>
          <Text>No results found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default GridScreen;
