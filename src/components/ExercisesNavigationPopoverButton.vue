<template>

  <PopoverRoot>

    <PopoverTrigger
      class="btn-primary flex items-center"
      aria-label="Update dimensions">

      <Icon icon="arcticons:baidu-homework" class="w-8 h-8 pr-1" />
       Exercises
    </PopoverTrigger>

    <PopoverPortal>

      <PopoverContent
        side="bottom"
        :side-offset="5"
        class="rounded-lg p-4 w-[260px] bg-(--color-muted) shadow-sm border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">

        <ToolbarRoot>

          <ToolbarButton
            @click="router.push('/exercises')"
            class="btn-primary flex items-center"
            aria-label="Update dimensions">

            <Icon icon="hugeicons:teacher" class="w-16 h-16 pr-1" />
             ADS1 in-class exercises
          </ToolbarButton>

          <ToolbarButton
            @click="router.push('/homeworks')"
            class="btn-primary flex items-center"
            aria-label="Update dimensions">

            <Icon
              icon="game-icons:classical-knowledge"
              class="w-16 h-16 pr-1" />
             ADS1 homeworks
          </ToolbarButton>

        </ToolbarRoot>

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
  import { router } from "@/router";
  import { Icon } from "@iconify/vue";
  import {
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
    ToolbarRoot,
    ToolbarButton,
  } from "reka-ui";
</script>

