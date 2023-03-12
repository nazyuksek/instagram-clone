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

// const query = "People";
const feedItems = 10;

// export async function getPhotos(): Promise<PhotosWithTotalResults> {
//   return client.photos.search({
//     query,
//     page: 1,
//     per_page: 35,
//   }) as unknown as PhotosWithTotalResults;
// }

export async function getFeed(
  page: number,
  query: string
): Promise<FeedItem[]> {
  var feed: FeedItem[] = [];
  var photos: Photo[] = (
    (await client.photos.search({
      query: query,
      page: page,
      per_page: feedItems * 2,
    })) as unknown as PhotosWithTotalResults
  ).photos;
  const videos = (
    (await client.videos.search({
      query: query,
      page: page,
      per_page: feedItems,
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
          description: [p1.alt!, p2.alt!],
          items: [p1.src.small, p2.src.small],
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
