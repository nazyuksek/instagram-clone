import { createClient, PhotosWithTotalResults, ErrorResponse } from "pexels";
import PhotosResponse from "../models/photosResponse";

const client = createClient(
  "qOje6Xh0aICA96FPeH1qRqPnMuDHhp3cPrIgRYoZ66HEETYFC5hCQHRS"
);
const query = "Nature";

export async function getPhotos(): Promise<PhotosWithTotalResults> {
  return client.photos.search({
    query,
    page: 1,
    per_page: 20,
  }) as unknown as PhotosWithTotalResults;
}

export async function getPhotographerProfilePictureUrl(
  photographerId: number
): Promise<string> {
  const response = await fetch(
    `https://api.pexels.com/v1/photographers/${photographerId}`,
    {
      headers: {
        Authorization:
          "qOje6Xh0aICA96FPeH1qRqPnMuDHhp3cPrIgRYoZ66HEETYFC5hCQHRS",
      },
    }
  );
  //console.log(response);

  const data = await response.json();
  return data.profile_picture;
}
