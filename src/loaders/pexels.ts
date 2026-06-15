import { getImage } from "astro:assets";

import type { GetImageResult } from "astro";
import type { LiveLoader } from "astro/loaders";
import type { ErrorResponse, Medium } from "pexels";

export interface Response {
  externalUrl: string;
  image: Pick<GetImageResult, "attributes" | "src">;
}

type MediaResponse =
  | {
      page: number;
      per_page: number;
      total_results: number;
      media: (Medium & { type: "Video" | "Photo" })[];
    }
  | ErrorResponse;

const PEXELS_MAX_PER_PAGE = 80;

/**
 * Fetch photos from a Pexels collection and then shuffle the order of results.
 *
 * @param apiKey - Portfolio's API key to access collections.
 * @param collectionId - The collection ID to fetch from.
 * @returns Promise resolving to an array of Pexels collection media.
 */
const __fetchPexelsMedia = async (apiKey: string, collectionId: string) => {
  const collectedMedia: Medium[] = [];
  let currentPage = 1;

  const requestHeaders = new Headers();
  requestHeaders.set("Authorization", apiKey);

  while (true) {
    const mediaResponse = await fetch(
      `https://api.pexels.com/v1/collections/${collectionId}?page=${currentPage}&per_page=${PEXELS_MAX_PER_PAGE}`,
      { headers: requestHeaders },
    );
    const data = (await mediaResponse.json()) as MediaResponse;

    if ("error" in data) throw new Error(data.error);
    else if (data.media.length === 0) break;

    collectedMedia.push(...data.media);
    currentPage++;
  }

  return collectedMedia;
};

export function createPexelsLoader(config: {
  apiKey: string;
  showcaseCollectionId: string;
}): LiveLoader<Response> {
  return {
    name: "pexels-loader",
    loadCollection: async () => {
      try {
        const mediaResponse = await __fetchPexelsMedia(
          config.apiKey,
          config.showcaseCollectionId,
        );

        const resolvedEntries = await Promise.all(
          mediaResponse.map(async (item) => {
            if (!("src" in item)) return null;

            const { attributes, src } = await getImage({
              inferSize: true,
              src: item.src.large2x,
            });

            return {
              id: `${item.id}`,
              data: {
                externalUrl: item.url,
                image: { attributes, src },
              },
            };
          }),
        );

        return {
          entries: resolvedEntries.filter(
            (entry): entry is NonNullable<typeof entry> => Boolean(entry),
          ),
          cacheHint: {
            tags: ["showcase"],
          },
        };
      } catch (error) {
        return {
          error: new Error("Failed to load Pexels showcase", {
            cause: error,
          }),
        };
      }
    },
    loadEntry: async () => {
      return {
        error: new Error("pexels-loader doesn't implement loadEntry()"),
      };
    },
  };
}
