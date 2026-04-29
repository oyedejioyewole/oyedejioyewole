export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();

  const content = await queryCollection("content").path(to.path).first();

  if (!content) {
    abortNavigation({
      status: 404,
      statusText: "Page not found",
      message: `You tried visiting a non-existent page [${to.path}]`,
    });
  }

  nuxtApp.payload.data[`content-${to.path}`] = content;
});
