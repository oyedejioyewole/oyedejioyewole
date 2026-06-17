import { getStore } from "@netlify/blobs";
import { purgeCache } from "@netlify/functions";
import { createHash } from "crypto";

import { fetchShowcaseCollection } from "../../src/utils/pexels";

import type { Config } from "@netlify/functions";

export default async () => {
  const { PEXELS_API_KEY, PEXELS_SHOWCASE_COLLECTION_ID } = process.env;
  const HASH_KEY = "showcase-hash";

  const store = getStore("cache-state");

  const mediaResponse = await fetchShowcaseCollection(
    PEXELS_API_KEY!,
    PEXELS_SHOWCASE_COLLECTION_ID!,
  );

  const savedHash = (await store.get(HASH_KEY)) as unknown as string;
  const currentHash = createHash("sha256")
    .update(JSON.stringify(mediaResponse))
    .digest("hex");

  if (savedHash !== currentHash) {
    await Promise.all([
      purgeCache({ tags: ["showcase"] }),
      store.set(HASH_KEY, currentHash),
    ]);
  }

  return new Response(
    JSON.stringify({ cachedPurged: savedHash !== currentHash, currentHash }),
  );
};

export const config = { schedule: "@weekly" } satisfies Config;
