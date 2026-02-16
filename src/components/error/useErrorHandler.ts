import { ref } from "vue";

const errorOccured = ref(false);
const errorMessage = ref("");
export function useErrorHandler() {
  return {
    errorOccured,
    errorMessage,
  };
}

interface NonFatalError {
  errorMessage: string;
}
export function triggerNonFatalError(error: NonFatalError) {
  errorOccured.value = true;
  errorMessage.value = error.errorMessage;
}
