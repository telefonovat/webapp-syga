import { ref } from "vue";

//Defaults
const fontSizePx = ref(12); // Maybe differentiate from editor font size?
const isCodeHighlightOn = ref(true);

const isVertexThemeWhite = ref(false); //Otherwise black

export function usePreferencesContent() {
  return { fontSizePx, isCodeHighlightOn, isVertexThemeWhite };
}
