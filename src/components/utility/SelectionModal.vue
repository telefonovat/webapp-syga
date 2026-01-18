<template>

  <fieldset v-if="typeof options === 'object'">

    <legend>Please select type</legend>

    <div v-for="option in Object.entries(props.options)">

      <input
        type="radio"
        name="selection"
        :value="option[0]"
        @change="emit('selected', option[0])" />

      <label :for="option[1]">
         {{ option[0] }}->
        <div
          :style="{ backgroundColor: option[1], height: '16px' }" />

      </label>

    </div>

  </fieldset>

  <form
    @submit.prevent="emit('selected', inputNumber.toString())"
    v-if="options === 'number'">

    <label>
       Please input value:
      <input type="number" v-model="inputNumber" />

      <button type="submit">Submit</button>

    </label>

  </form>

</template>

<script setup lang="ts">
  import {
    EdgeOption,
    VertexOption,
  } from "@telefonovat/syga--contract";
  import { ref } from "vue";

  interface Props {
    options: { [key: string]: string } | "number";
  }
  const emit = defineEmits<{
    (e: "selected", selected: VertexOption | EdgeOption): void;
  }>();
  const props = defineProps<Props>();

  const inputNumber = ref(0);
</script>

