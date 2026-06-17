import { getImage } from "astro:assets";

import { fetchShowcaseCollection } from "../utils/pexels";

import type { GetImageResult } from "astro";
import type { LiveLoader } from "astro/loaders";

export interface Response {
  externalUrl: string;
  image: Pick<GetImageResult, "attributes" | "src">;
}

/**
 * Fetch photos from a Pexels collection and then shuffle the order of results.
 *
 * @param apiKey - Portfolio's API key to access collections.
 * @param collectionId - The collection ID to fetch from.
 * @returns Promise resolving to an array of Pexels collection media.
 */

export function createPexelsLoader(config: {
  apiKey: string;
  showcaseCollectionId: string;
}): LiveLoader<Response> {
  return {
    name: "pexels-loader",
    loadCollection: async () => {
      try {
        const mediaResponse = await fetchShowcaseCollection(
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
