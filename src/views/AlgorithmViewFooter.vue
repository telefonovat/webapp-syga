
<script setup lang="ts">
  import { useUserStore } from "@/store/user/userStore";
  import { storeToRefs } from "pinia";

  const { fontSizePx } = storeToRefs(useUserStore());
</script>

<template>

  <div class="algorithm-view-footer-container">

    <div :style="{ width: '200px' }">
       font size: {{ fontSizePx }}px
      <button class="small-button" @click="fontSizePx++">+</button>

      <button class="small-button" @click="fontSizePx--">-</button>

    </div>

  </div>

</template>

<style scoped>
  .algorithm-view-footer-container{
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.small-button{
  min-width: 0.5rem;
  align-content: center;
  }
</style>

