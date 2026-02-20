
<template>

  <Suspense>

    <ImmediateFeedbackView class="h-full" />

    <template #fallback>

      <div>Loading...</div>

    </template>

  </Suspense>

</template>

<script setup lang="ts">
  import ImmediateFeedbackView from "./ImmediateFeedbackView.vue";
</script>

