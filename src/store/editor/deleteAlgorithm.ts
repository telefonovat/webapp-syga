import { getAlgorithmResourceUrl, buildHeaders } from "@/api";
import { useAuthStore } from "../user/authStore";
import { handleUnauthorized } from "@/api/auth";

export async function deleteAlgorithm(uuid: string) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    alert("You are not signed in");
    return;
  }
  const response = await fetch(getAlgorithmResourceUrl(uuid), {
    method: "DELETE",
    headers: buildHeaders(),
    credentials: "include",
  });

  if (response.status === 401) {
    handleUnauthorized();
  }

  if (response.status === 200 || response.status === 204) {
    alert("Deletion OK");
  } else {
    alert("Deletion failed");
  }
}
