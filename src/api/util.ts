import { useAuthStore } from "@/store/user/authStore";

export function buildHeaders() {
  const authStore = useAuthStore();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}
