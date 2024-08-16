<script setup lang="ts">
import { iconMap } from "@/assets/icons/feather-icons";

const DEFAULT_ICON = "feather-alert-triangle";
interface Props {
  size?: number,
  iconName?: string,
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  iconName: DEFAULT_ICON,
})
const iconHtml = iconMap[props.iconName] ?? DEFAULT_ICON;
console.log(`${props.iconName}`);
</script>

<template>
  <div v-html="iconHtml"></div>
</template>

<style scoped></style>
