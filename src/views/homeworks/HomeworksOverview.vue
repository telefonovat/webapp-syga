<template>

  <div class="flex justify-center items-center">

    <TreeRoot
      v-slot="{ flattenItems }"
      class="list-none select-none w-100 h-75 bg-(--color-muted) rounded-lg border shadow-sm p-2 text-sm font-medium"
      :items="items"
      :get-key="(item) => item.title"
      :default-expanded="['components']">

      <h2 class="font-semibold text-sm px-2 pt-1 pb-3">
         Homeworks
      </h2>

      <TreeItem
        v-for="item in flattenItems"
        @click="handleClick(item.value.title)"
        v-slot="{ isExpanded }"
        :key="item._id"
        :style="{ 'padding-left': `${item.level - 0.5}rem` }"
        v-bind="item.bind"
        class="flex items-center py-1 px-2 my-0.5 rounded outline-none focus:ring-grass8 focus:ring-2 data-[selected]:bg-grass4">

        <template v-if="item.hasChildren">

          <Icon
            v-if="!isExpanded"
            icon="lucide:folder"
            class="h-4 w-4" />

          <Icon v-else icon="lucide:folder-open" class="h-4 w-4" />

        </template>

        <Icon
          v-else
          :icon="item.value.icon || 'lucide:file'"
          class="h-4 w-4" />

        <div class="pl-2"> {{ item.value.title }} </div>

      </TreeItem>

    </TreeRoot>

  </div>

</template>

<script setup lang="ts">
  import { router } from "@/router";
  import { Icon } from "@iconify/vue";
  import { TreeItem, TreeRoot } from "reka-ui";

  const items = [
    {
      title: "search",
      icon: "iwwa:search",
      url: undefined,
      children: [
        {
          title: "Caterpillar",
          icon: "streamline-plump:memes-comment-reply",
          url: "/homework/search/caterpillar",
        },
      ],
    },
    {
      title: "shortest-path",
      icon: "iwwa:search",
      url: undefined,
      children: [
        {
          title: "Skyscanner",
          icon: "streamline-plump:memes-comment-reply",
          url: "/homework/shortest-path/skyscanner",
        },
        {
          title: "Limbo Escape",
          icon: "streamline-plump:memes-comment-reply",
          url: "/homework/shortest-path/limbo-escape",
        },
      ],
    },
  ];

  function handleClick(exerciseTitle: string) {
    const exerciseWeek = items.find((week) =>
      week.children.find((e) => e.title === exerciseTitle),
    );
    const nextUrl = exerciseWeek?.children.find(
      (c) => c.title === exerciseTitle,
    )?.url;
    if (!nextUrl) return;
    router.push(nextUrl);
  }
</script>

