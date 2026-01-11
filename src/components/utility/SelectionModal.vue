<template>

  <fieldset>

    <legend>Please select type</legend>

    <div v-for="option in Object.entries(props.options)">

      <input
        type="radio"
        name="selection"
        :value="option[0]"
        @change="emit('selected', option[0])" />

      <label :for="option[1]">{{ option[0] }}->{{ option[1] }}</label>

    </div>

  </fieldset>

</template>

<script setup lang="ts">
  interface Props {
    options: { [key: string]: string };
  }
  const emit = defineEmits<{
    (e: "selected", selected: string): void;
  }>();
  const props = defineProps<Props>();
</script>

