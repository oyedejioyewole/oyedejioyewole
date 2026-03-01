import { createClient } from "pexels";
import { fetchMasonryMedia } from "../../utils/fetch-masonry-media";

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

  const media = await fetchMasonryMedia(
    pexelsClient,
    pexels.showcaseCollectionId,
    media_count,
  );

  // Transform Pexels media to Masonry format
  return {
    media: media
      .map((item) => {
        const mediaUrl = "src" in item && new URL(item.src.original);
        if (!mediaUrl) return null;

        return {
          id: item.id,
          src: mediaUrl.href,
          height: item.height,
          width: item.width,
        };
      })
      .filter(Boolean),
    totalMedia: media_count,
  };
});
