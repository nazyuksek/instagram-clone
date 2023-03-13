import {
  createClient,
  PhotosWithTotalResults,
  Photo,
  ErrorResponse,
  Videos,
  Video,
} from "pexels";
import FeedItem from "../models/feedObjects";

const client = createClient(
  "qOje6Xh0aICA96FPeH1qRqPnMuDHhp3cPrIgRYoZ66HEETYFC5hCQHRS"
);

const feedItems = 8;

export async function getFeed(
  page: number,
  query: string,
  itemCount: number
): Promise<FeedItem[]> {
  var feed: FeedItem[] = [];
  var photos: Photo[] = (
    (await client.photos.search({
      query: query,
      page: page,
      per_page: itemCount * 2,
    })) as unknown as PhotosWithTotalResults
  ).photos;
  const videos = (
    (await client.videos.search({
      query: query,
      page: page,
      per_page: itemCount,
    })) as unknown as Videos
  ).videos;
  while (photos.length + videos.length != 0) {
    if (Math.random() > 0.5) {
      if (photos.length != 0) {
        const p1 = photos.pop() as Photo;
        const p2 = photos.pop() as Photo;
        feed.push({
          type: "photo",
          user: p1.photographer,
          description: [p1.alt!],
          items: [p1.src.medium, p2.src.medium],
          liked: p1.liked,
          id: p1.id,
        });
      } else {
        const v1 = videos.pop() as Video;
        feed.push({
          type: "video",
          user: v1.user.name,
          description: [v1.duration! + ""],
          items: [v1.video_files[0].link],
          liked: false,
          id: v1.id,
        });
      }
    } else {
      if (videos.length != 0) {
        const v1 = videos.pop() as Video;
        feed.push({
          type: "video",
          user: v1.user.name,
          description: [v1.duration! + ""],
          items: [v1.video_files[0].link],
          liked: false,
          id: v1.id,
        });
      }
    }
  }
  return feed;
}
