import { ref } from "vue";

const shouldDisplaySnackbar = ref(false);
const snackBarTitle = ref("");

export function useSnackBar() {
  function triggerSnackBar(message: string) {
    shouldDisplaySnackbar.value = true;
    snackBarTitle.value = message;
  }

  return {
    shouldDisplaySnackbar,
    snackBarTitle,
    triggerSnackBar,
  };
}
