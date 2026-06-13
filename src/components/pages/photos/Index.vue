<template>
    <!-- Photo showcase -->
    <ul class="space-y-4 md:columns-2">
        <li
            v-for="(photo, index) in resolvedMedia.slice(startIndex, endIndex)"
            :key="photo.id"
            :data-index="index"
        >
            <a target="_blank" :href="photo.data.externalUrl">
                <img
                    v-bind="photo.data.image.attributes"
                    :ref="onImageRef"
                    class="brightness-70 transition duration-300 hover:brightness-100 bg-current/10 hover:cursor-none [&:not([data-loaded])]:aspect-3/4 rounded-2xl"
                    data-morph-cursor
                    width="940"
                    :alt="`Pexels ID: ${photo.id}`"
                    :src="photo.data.image.src"
                    @load="onImageLoad"
                />
            </a>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { computed, onMounted, watchEffect } from "vue";
import { useEventListener, useOffsetPagination } from "@vueuse/core";

import type { Response } from "../../../loaders/pexels";
import type { LiveDataEntry } from "astro";

// 2nd pass to ensure uncached images are marked as loaded
function onImageLoad(event: Event) {
    (event.target as HTMLImageElement).dataset["loaded"] = "true";
}

// 1st pass to ensure images gotten from cache are marked as loaded
function onImageRef(element: HTMLImageElement | null) {
    if (element?.complete) element.dataset["loaded"] = "true";
}

const { data: resolvedMedia } = defineProps<{
    data: LiveDataEntry<Response>[];
}>();

const { currentPage, currentPageSize, isFirstPage, isLastPage, next, prev } =
    useOffsetPagination({
        total: resolvedMedia.length,
        pageSize: 4,
    });

const startIndex = computed(
    () => (currentPage.value - 1) * currentPageSize.value,
);
const endIndex = computed(() => startIndex.value + currentPageSize.value);

onMounted(() => {
    const previousControlButtonRef = document.querySelector<HTMLButtonElement>(
        "button[data-action=previous]",
    )!;
    const nextControlButtonRef = document.querySelector<HTMLButtonElement>(
        "button[data-action=next]",
    )!;

    watchEffect(() => {
        previousControlButtonRef.disabled = false;
        nextControlButtonRef.disabled = false;

        if (isFirstPage.value) previousControlButtonRef.disabled = true;
        else if (isLastPage.value) nextControlButtonRef.disabled = true;
    });

    useEventListener(previousControlButtonRef, "click", prev);
    useEventListener(nextControlButtonRef, "click", next);
});
</script>
