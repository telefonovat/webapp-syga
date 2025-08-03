import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "./store/user/settingsStore";

export function useSyncFontSize() {
  const settingsStore = useSettingsStore();
  const { fontSizePx } = storeToRefs(settingsStore);
  function updateFontSize(size: number) {
    document.documentElement.style.setProperty(
      "--global-font-size",
      `${size}px`,
    );
  }

  watch(fontSizePx, (value) => {
    updateFontSize(value);
  });
}
