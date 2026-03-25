import { ref } from "vue";

//Defaults
const fontSizePx = ref(12); // Maybe differentiate from editor font size?
const isCodeHighlightOn = ref(true);

const isVertexThemeWhite = ref(false); // Otherwise black
const isEdgeThemeWhite = ref(true); // Otherwise black

export function usePreferencesContent() {
  return {
    fontSizePx,
    isCodeHighlightOn,
    isVertexThemeWhite,
    isEdgeThemeWhite,
  };
}
