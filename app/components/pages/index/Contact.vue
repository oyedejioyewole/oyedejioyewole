<template>
  <PagesSection no-divider>
    <slot />

    <ProseP class="absolute bottom-8" has-accent
      >&copy; 2024 - {{ new Date().getFullYear() }} Oyedeji Oyewole.</ProseP
    >
  </PagesSection>
</template>
