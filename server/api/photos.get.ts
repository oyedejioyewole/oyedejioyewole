import { createClient } from "pexels";
import { fetchPhotos } from "../utils/fetch-photos";

export default defineEventHandler(async () => {
  const { pexels } = useRuntimeConfig();
  const pexelsClient = createClient(pexels.apiKey);
  const collectionsResponse = await pexelsClient.collections.all();

  if ("error" in collectionsResponse)
    throw createError({
      statusCode: 400,
      statusMessage: collectionsResponse.error,
    });

  const showcaseCollection = collectionsResponse.collections.find(
    (collection) => collection.id === pexels.showcaseCollectionId,
  );

  if (!showcaseCollection)
    throw createError({
      statusCode: 404,
      statusMessage: "There's no collection for the showcase.",
    });

  const { media_count } = showcaseCollection;

  if (!media_count) {
    throw createError({
      statusCode: 404,
      statusMessage: "There's no media in this collection to fetch.",
    });
  }

  const media = await fetchPhotos(
    pexelsClient,
    pexels.showcaseCollectionId,
    media_count,
  );

  // Transform Pexels media to Masonry format
  return {
    media: media
      .map((item) => {
        if (!("src" in item)) return null;

        return {
          id: item.id,
          externalUrl: item.url,
          src: item.src.original,
        };
      })
      .filter(Boolean),
    totalMedia: media_count,
  };
});
