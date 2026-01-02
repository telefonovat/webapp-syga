<script setup lang="ts">
  import AwesomePopup from "@/components/utility/AwesomePopup.vue";
  import { useSettingsStore } from "@/store/user/settingsStore";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";

  const { fontSizePx } = storeToRefs(useSettingsStore());

  const isFontSizePopUpVisible = ref(false);
</script>

<template>

  <div class="algorithm-view-footer-container">

      <button @click="isFontSizePopUpVisible = true">
         font size: {{ fontSizePx }}px
      </button>

      <AwesomePopup
        @closed="isFontSizePopUpVisible = false"
        :isDisplayed="isFontSizePopUpVisible">
          <div class="font-size-form">
            <label>Fontsize</label>
            <input v-model="fontSizePx"></input>
          </div>
      </AwesomePopup>

  </div>

</template>

<style scoped>
  .algorithm-view-footer-container{
  display: flex;
  flex-direction: row;



  width: 200px;

}

.small-button{
  min-width: 0.5rem;
  align-content: center;
  }

.font-size-form{
}
</style>

