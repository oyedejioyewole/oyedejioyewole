export const useCurrentPath = () => {
  const route = useRoute();
  const currentPath = useState("currentPath", () => route.path);

  return {
    currentPath,
    route,
  };
};
