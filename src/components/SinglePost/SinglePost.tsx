import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import PhotosResponse from "../../models/photosResponse";
import {
  getPhotos,
  getPhotographerProfilePictureUrl,
} from "../../services/PexelService";
import { styles } from "./SinglePost.style";
import { LazyloadView } from "react-native-lazyload";

interface SinglePostProps {
  image: string;
  username: string;
  caption: string;
  photographerId: number;
}

function SinglePost({
  image,
  username,
  caption,
  photographerId,
}: SinglePostProps) {
  useEffect(() => {
    const fetchData = async () => {
      await getPhotographerProfilePictureUrl(photographerId).then((res) => {
        //console.log(photographerId);
      });
    };
    fetchData();
  }, []);

  return (
    <View style={styles.post}>
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
}

export default SinglePost;
