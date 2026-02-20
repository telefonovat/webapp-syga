<template>

  <div>

    <h3 v-if="title" class="grift-title"> {{ title }}</h3>

    <svg
      class="component"
      :viewBox="`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`">

      <GraphEdge
        class="clickable"
        v-for="([edgeId, edgePropsPartial], index) in Object.entries(
          edgesPropsPartial,
        )"
        :key="edgeId"
        :width="4"
        @click="
          () => {
            isEdgeClicked = true;
            clickedEdgeId = edgeId;
          }
        "
        v-bind="{ ...edgePropsPartial, id: `${prefix}-${index}` }" />

      <GraphNode
        class="clickable"
        v-for="[vertexId, vertexProps] in Object.entries(
          verticesProps,
        )"
        :key="vertexId"
        :radius="18"
        v-bind="vertexProps" />

    </svg>

    <PopoverRoot v-model:open="isEdgeClicked">

      <PopoverTrigger />

      <PopoverPortal>

        <PopoverContent
          side="bottom"
          :side-offset="5"
          class="rounded-lg p-5 w-[260px] bg-(--color-muted) shadow-sm border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">

          <div class="flex flex-col gap-2.5">

            <p class="text-sm leading-[19px] font-semibold mb-2.5">
               Choose an option for this edge
            </p>

            <RadioGroupRoot
              v-if="edgeColorChoices.length > 0"
              v-model="edgeColorChoiceTitle"
              class="flex flex-col gap-2.5"
              :default-value="edgeColorChoices[0]"
              aria-label="View density">

              <div
                v-for="choice in edgeColorChoices"
                class="flex items-center">

                <RadioGroupItem
                  :id="choice.title"
                  class="bg-white w-[1.125rem] h-[1.125rem] rounded-full border data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-stone-700 outline-none cursor-default"
                  :value="choice.title">

                  <RadioGroupIndicator
                    class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-white dark:after:bg-stone-700" />

                </RadioGroupItem>

                <label
                  class="text-stone-700 dark:text-white text-sm leading-none pl-[15px]"
                  :for="choice.title">
                   {{ choice.title }}
                </label>

              </div>

            </RadioGroupRoot>

          </div>

          <PopoverClose
            class="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center absolute top-[8px] right-[8px] hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
            aria-label="Close">

            <Icon
              icon="material-symbols-light:close"
              class="size-5" />

          </PopoverClose>

          <PopoverArrow class="fill-white stroke-gray-200" />

          <div class="mt-[25px] flex justify-end">

            <PopoverClose asChild>

              <button
                asChild
                @click="handleEdgeChoice"
                class="text-sm hover:bg(--color-accent) focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                 Confirm
              </button>

            </PopoverClose>

          </div>

        </PopoverContent>

      </PopoverPortal>

    </PopoverRoot>

  </div>

</template>

<script setup lang="ts">
  import GraphEdge from "../graph/GraphEdge.vue";
  import GraphNode from "../graph/GraphNode.vue";

  import { Icon } from "@iconify/vue";
  import {
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
  } from "reka-ui";

  import { ref, toRef, toRefs } from "vue";
  import { useGraphRenderData } from "./useGraphRenderData";
  import {
    EdgeOption,
    GraphComponent,
    GraphVertex,
    VertexOption,
  } from "@telefonovat/syga--contract";
  import { EdgeChoice } from "@/views/exercises/ifTemp/useImmediateFeedbackData";

  interface Props {
    viewBoxSize: number;
    component: GraphComponent;
    edgeOptions: { [key: string]: string } | "number";
    vertexOptions: { [key: string]: string } | "number";
    edgeColorChoices: EdgeChoice[];

    static?: boolean;
    title?: string;
    prefix: string;
  }
  const props = withDefaults(defineProps<Props>(), { static: false });
  const emit = defineEmits<{
    (
      e: "edge-color-choice-made",
      [start, end]: [GraphVertex, GraphVertex],
      choice: EdgeChoice,
    ): void;
    (
      e: "edge-option-selected",
      start: GraphVertex,
      end: GraphVertex,
      option: EdgeOption,
    ): void;
    (
      e: "vertex-option-selected",
      vertex: GraphVertex,
      option: VertexOption,
    ): void;
  }>();

  const { verticesProps, edgesPropsPartial } = toRefs(
    useGraphRenderData(toRef(props, "component"), props.viewBoxSize),
  );

  const isEdgeClicked = ref(false);
  const clickedEdgeId = ref("");
  const edgeColorChoiceTitle = ref<EdgeChoice["title"]>("");
  function handleEdgeChoice() {
    if (props.static) return;
    if (clickedEdgeId.value === "") return;
    if (edgeColorChoiceTitle.value === "") return;

    const tokens = clickedEdgeId.value.split("->");
    const start = tokens[0];
    const end = tokens[1];

    const choice = props.edgeColorChoices.find(
      (c) => c.title === edgeColorChoiceTitle.value,
    )!;
    emit(
      "edge-color-choice-made",
      [{ id: start }, { id: end }],
      choice,
    );
  }
</script>

<style scoped>
  .component{
  display: block;
  height: 100%;
  margin: auto;
}
  .grift-title{
    text-align: center;
  }

  .clickable:hover{
    cursor: pointer
  }
</style>

