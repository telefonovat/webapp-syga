import { ref } from "vue";
import { useBuildStatus } from "../editor/useBuildStatus";

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
  const { buildStatus } = useBuildStatus();
  errorOccured.value = true;
  errorMessage.value = error.errorMessage;

  buildStatus.value = "failure";
}
