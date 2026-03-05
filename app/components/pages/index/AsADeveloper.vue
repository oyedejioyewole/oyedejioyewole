<template>
  <PagesSection id="as-a-developer-section" multi-column no-divider>
    <!-- Left column: intro and slot content -->
    <section class="max-w-md space-y-4">
      <slot />
    </section>

    <!-- Right column: featured projects showcase -->
    <section class="grid place-items-center gap-y-4">
      <ProseH3><b>Featured Projects</b></ProseH3>

      <AppProjects />

      <UiButton :to="socialLinks[0].url" class="group border-dashed">
        View all
        <PhosphorIcon
          class="ease-in-out-circ transition-transform duration-300 group-hover:translate-x-2"
          name="arrow-square-out"
        />
      </UiButton>
    </section>
  </PagesSection>
</template>

<script lang="ts" setup>
const { socialLinks } = useAppConfig();
</script>
