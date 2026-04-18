import type { Medium, createClient } from "pexels";

const PEXELS_MAX_PER_PAGE = 80;

/**
 * Fetch photos from a Pexels collection and then shuffle the order of results.
 *
 * @param pexelsClient - Initialized Pexels client.
 * @param collectionId - The collection ID to fetch from.
 * @param mediaCount - Total media count from collection metadata.
 * @returns Promise resolving to a shuffle array of photos.
 */
export async function fetchPhotos(
  pexelsClient: ReturnType<typeof createClient>,
  collectionId: string,
  mediaCount: number,
) {
  const totalPages = Math.ceil(mediaCount / PEXELS_MAX_PER_PAGE);

  const collectedMedia: Medium[] = [];

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const pageData = await pexelsClient.collections.media({
      id: collectionId,
      page: currentPage,
      per_page: PEXELS_MAX_PER_PAGE,
    });

    if ("error" in pageData)
      throw createError({
        statusCode: 400,
        statusMessage: pageData.error,
      });

    // If no results returned, we've exhausted available pages
    if (pageData.media.length === 0) break;

    collectedMedia.push(...pageData.media);
  }

  return collectedMedia;
}
