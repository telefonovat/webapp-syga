<template>

  <PopoverRoot>

    <PopoverTrigger
      class="btn-primary flex items-center"
      aria-label="Update dimensions">

      <Icon icon="ph:gear-light" class="size-7" />

    </PopoverTrigger>

    <PopoverPortal>

      <PopoverContent
        side="bottom"
        :side-offset="5"
        class="rounded-lg p-4 w-[260px] bg-(--color-muted) shadow-sm border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">

        <PreferencesContent />

        <PopoverClose
          class="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-grass11 absolute top-[8px] right-[8px] hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
          aria-label="Close">

          <Icon icon="radix-icons:cross-2" />

        </PopoverClose>

        <PopoverArrow class="fill-white stroke-gray-200" />

      </PopoverContent>

    </PopoverPortal>

  </PopoverRoot>

</template>

<script setup lang="ts">
  import PreferencesContent from "./PreferencesContent.vue";

  import { Icon } from "@iconify/vue";
  import {
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
  } from "reka-ui";
</script>

