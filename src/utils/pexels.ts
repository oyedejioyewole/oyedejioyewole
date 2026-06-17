import type { ErrorResponse, Medium } from "pexels";

type MediaResponse =
  | {
      page: number;
      per_page: number;
      total_results: number;
      media: (Medium & { type: "Video" | "Photo" })[];
    }
  | ErrorResponse;

export const fetchShowcaseCollection = async (
  apiKey: string,
  collectionId: string,
) => {
  const PEXELS_MAX_PER_PAGE = 80;

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
