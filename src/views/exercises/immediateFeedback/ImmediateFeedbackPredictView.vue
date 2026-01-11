<template>

  <!-- Exercise description and GRIFT(Graph Response Input Form Tool) side by side-->

  <!-- Also control panel with prev, next,retry buttons at the bottom -->

  <div class="immediate-feedback-predict">

    <div>Hello world</div>

    <Grift :component="props.component" :viewBoxSize="400" />

  </div>

</template>

<script setup lang="ts">
  import { GraphComponent } from "@telefonovat/syga--contract";
  import Grift from "@/components/visualizer/grift/Grift.vue";

  interface Props {
    component: GraphComponent;
  }
  const props = defineProps<Props>();
</script>

<style scoped>
  .immediate-feedback-predict{
    display: flex;
    height: 100%;
    & > *{
      flex-grow: 1;
    }

    border-bottom: 1px solid #444;
  }
</style>

