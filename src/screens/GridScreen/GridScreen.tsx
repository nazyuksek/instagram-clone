import { useNavigation } from "@react-navigation/native";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBar from "../../components/BackBar/BackBar";
import { AppNavigationProp } from "../../navigation/AppNavigation";
import { styles } from "./GridScreen.style";
import {
  Animated,
  FlatList,
  Text,
  TextInput,
  View,
  ViewToken,
} from "react-native";
import { getFeed } from "../../services/pexel";
import FeedItem from "../../models/feedObjects";
import GridComponent from "../../components/GridComponent/GridComponent";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface GridScreenProps {}

function GridScreen({}: GridScreenProps) {
  const navigation = useNavigation<AppNavigationProp>();
  const [searchText, setSearchText] = useState<string>("People");
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<FeedItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [shouldAutoplay, setShouldAutoplay] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }): void => {
      const visibleItems = info.viewableItems.map((entry) => entry.item.id);
      setShouldAutoplay(visibleItems);
    },
    []
  );

  const fetchData = async () => {
    setLoading(true);
    await getFeed(page, searchText, 12)
      .then((res) => {
        if (items !== undefined) {
          setItems([...items, ...res]);
        } else {
          setItems(res);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleEndReached = () => {
    if (!loading) {
      setPage((page) => page + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await getFeed(page, searchText, 4)
      .then((res) => {
        setItems(res);
      })
      .catch((error) => {
        setError(error.toString());
      });
    setLoading(false);
  };

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
      {items?.length !== 0 ? (
        <FlatList
          style={[styles.postsList, { height: !loading ? "100%" : "90%" }]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={items}
          numColumns={3}
          key={0}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item, index) => index.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item }) => (
            <Suspense>
              <View style={styles.postContainer}>
                <GridComponent
                  type={item.type}
                  items={item.items}
                  shouldPlay={shouldAutoplay.includes(item.id)}
                />
              </View>
            </Suspense>
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={1}
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No results found</Text>
        </View>
      )}
      {loading && (
        <View style={styles.loading}>
          <AntDesign name="loading1" size={24} color="black" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default GridScreen;
