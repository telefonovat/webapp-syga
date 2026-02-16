import { useErrorHandler } from "@/components/error/useErrorHandler";

const { errorOccured, errorMessage } = useErrorHandler();
export function handleAPIError() {
  errorOccured.value = true;
  errorMessage.value =
    "There was a problem communicating with the server. Please try again.";
}

export function handleUnknownError() {
  errorOccured.value = true;
  errorMessage.value =
    "An unknown error occured. Please contact the administrator at ";
}
