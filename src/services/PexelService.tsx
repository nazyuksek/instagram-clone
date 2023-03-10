import { createClient, PhotosWithTotalResults, ErrorResponse } from "pexels";

const client = createClient(
  "qOje6Xh0aICA96FPeH1qRqPnMuDHhp3cPrIgRYoZ66HEETYFC5hCQHRS"
);
const query = "People";

export async function getPhotos(): Promise<PhotosWithTotalResults> {
  return client.photos.search({
    query,
    page: 1,
    per_page: 20,
  }) as unknown as PhotosWithTotalResults;
}
