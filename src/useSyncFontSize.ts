import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "./store/user/userStore";

export function useSyncFontSize() {
  const userStore = useUserStore();
  const { fontSizePx } = storeToRefs(userStore);
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
