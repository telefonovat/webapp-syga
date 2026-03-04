import { ref } from "vue";

// idle is only at the start when you have not tried building yet
export type BuildStatus = "success" | "failure" | "building" | "idle";

const buildStatus = ref<BuildStatus>("idle");

export function useBuildStatus() {
  return { buildStatus };
}
