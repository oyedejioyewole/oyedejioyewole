export const usePhotos = () => {
  return useLazyFetch("/api/photos", {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    key: "photos",
    transform: (response) => {
      return {
        ...response,
        media: __shuffleArray(response.media),
      };
    },
  });
};
