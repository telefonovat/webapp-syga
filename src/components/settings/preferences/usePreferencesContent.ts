import { ref } from "vue";

//Defaults
const fontSizePx = ref(12); // Maybe differentiate from editor font size?
const isCodeHighlightOn = ref(true);

export function usePreferencesContent() {
  return { fontSizePx, isCodeHighlightOn };
}
