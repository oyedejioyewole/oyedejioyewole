<script lang="ts" setup>
import { pastelTheme, type NotivueTheme } from "notivue";
import "notivue/animations.css";
import "notivue/notifications.css";

type ColorTheme = "dark" | "light";

const { data: labContent } = await useAsyncData(() =>
  queryCollection("content").path("/lab").first(),
);

const colorTheme = useColorMode();
onMounted(async () => {
  useToggleNotivueTheme(colorTheme.value as ColorTheme);
});

watch(colorTheme, (_new) => useToggleNotivueTheme(_new.value as ColorTheme));

const theme = ref<NotivueTheme>();
/**
 * This function toggles the theme of notifications
 * between 'dark' and 'light'
 */
function useToggleNotivueTheme(_theme: ColorTheme) {
  const defaults: { dark: NotivueTheme; light: NotivueTheme } = {
    dark: {
      ...pastelTheme,
      "--nv-success-accent": "#ffffff",
      "--nv-success-fg": "#ffffff",
      "--nv-success-bg": "rgba(255, 255, 255, 0.2)",
      "--nv-success-border": "#ffffff",
      "--nv-border-width": "1px",
    },
    light: {
      ...pastelTheme,
      "--nv-success-accent": "#000000",
      "--nv-success-fg": "#000000",
      "--nv-success-bg": "rgba(0, 0, 0, 0.2)",
      "--nv-success-border": "#000000",
      "--nv-border-width": "1px",
    },
  };

  if (_theme === "dark") theme.value = defaults.dark;
  else theme.value = defaults.light;
}
</script>

<template>
  <ContentRenderer class="space-y-6" v-if="labContent" :value="labContent" />

  <Notivue v-slot="item">
    <Notifications :item="item" :theme="theme" />
  </Notivue>
</template>
