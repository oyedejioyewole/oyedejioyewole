/**
 * Fetch masonry media with random page selection and fallback filling
 */

import type { Medium, createClient } from "pexels";

/**
 * Get a random page number
 */
const __getRandomPage = (maxPages: number) =>
  Math.floor(Math.random() * maxPages) + 1;

/**
 * Calculate the total number of pages based on item count and items per page
 */
const __calculateTotalPages = (totalItems: number, perPage: number) =>
  Math.ceil(totalItems / perPage);

/**
 * Shuffle array using sort-based shuffle
 */
const __shuffleArray = <T>(array: T[]) => array.sort(() => Math.random() - 0.5);

/**
 * Fetch masonry media from a Pexels collection with random page selection
 * and complementary filling from the previous page if results are incomplete.
 * Results are then randomly shuffled.
 *
 * @param pexelsClient - Initialized Pexels client
 * @param collectionId - The collection ID to fetch from
 * @param mediaCount - Total media count from collection metadata
 * @returns Promise with shuffled media items
 */
export async function fetchMasonryMedia(
  pexelsClient: ReturnType<typeof createClient>,
  collectionId: string,
  mediaCount: number,
) {
  const DESIRED_RESULTS = 15;
  const PER_PAGE_COUNT = 15;

  // Calculate total available pages
  const totalPages = __calculateTotalPages(mediaCount, PER_PAGE_COUNT);

  if (totalPages === 0)
    throw createError({
      statusCode: 404,
      statusMessage: "There's no media in this collection to fetch.",
    });

  const collectedMedia: Medium[] = [];

  // Get initial random page
  let currentPage = __getRandomPage(totalPages);

  // Fetch initial page
  const initialData = await pexelsClient.collections.media({
    id: collectionId,
    page: currentPage,
    per_page: PER_PAGE_COUNT,
  });

  if ("error" in initialData)
    throw createError({
      statusCode: 400,
      statusMessage: initialData.error,
    });

  collectedMedia.push(...initialData.media);

  // If we don't have enough results and there's a previous page, fetch it
  if (collectedMedia.length < DESIRED_RESULTS && currentPage > 1) {
    currentPage -= 1;

    const previousData = await pexelsClient.collections.media({
      id: collectionId,
      page: currentPage,
      per_page: PER_PAGE_COUNT,
    });

    if ("error" in previousData)
      throw createError({
        statusCode: 400,
        statusMessage: previousData.error,
      });

    collectedMedia.push(...previousData.media);
  }

  // Slice to desired count and randomly sort
  const finalMedia = collectedMedia.slice(0, DESIRED_RESULTS);
  const shuffledMedia = __shuffleArray(finalMedia);

  return shuffledMedia;
}
