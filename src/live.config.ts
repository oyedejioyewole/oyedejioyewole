import { defineLiveCollection } from "astro:content";
import {
  PEXELS_API_KEY,
  PEXELS_SHOWCASE_COLLECTION_ID,
} from "astro:env/server";

import { createPexelsLoader } from "./loaders/pexels";

const photos = defineLiveCollection({
  loader: createPexelsLoader({
    apiKey: PEXELS_API_KEY,
    showcaseCollectionId: PEXELS_SHOWCASE_COLLECTION_ID,
  }),
});

export const collections = { photos };
