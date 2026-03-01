export const useTasks = () => {
  const route = useRoute();

  // Maps each page path to its number of completed tasks.
  // A page is considered fully loaded when its count reaches the page's numberOfTasks.
  const completedTasksByPage = useState<Record<string, number>>(
    "completedTasksByPage",
    () => ({}),
  );

  const numberOfCompletedTasks = computed(
    () => completedTasksByPage.value[route.path] ?? 0,
  );

  function completeTask(from?: string) {
    completedTasksByPage.value = {
      ...completedTasksByPage.value,
      [route.path]: numberOfCompletedTasks.value + 1,
    };

    console.info(`Called from: ${from}`);
  }

  return {
    numberOfCompletedTasks,
    completeTask,
  };
};
