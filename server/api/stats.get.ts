import { Vercel } from "@vercel/sdk";

export default defineEventHandler(async () => {
  const {
    vercel: { bearerToken, initialDeploymentId },
  } = useRuntimeConfig();

  const vercel = new Vercel({ bearerToken });

  const [firstDeployment, recentDeployment] = await Promise.all([
    vercel.deployments.getDeployment({
      idOrUrl: initialDeploymentId,
    }),
    vercel.deployments.getDeployments({
      limit: 1,
    }),
  ]);

  return {
    hostedAt: firstDeployment.ready!,
    updatedAt: recentDeployment.deployments[0].ready!,
  };
});
