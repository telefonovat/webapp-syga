import { useAuthStore } from "@/store/user/authStore";

const authStore = useAuthStore();
export function buildHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(authStore.isAuthenticated && {
      Authorization: `Bearer ${authStore.accessToken}`,
    }),
  };
}
