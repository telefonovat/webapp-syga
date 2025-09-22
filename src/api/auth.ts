import { router } from "@/router";
import { useAuthStore } from "@/store/user/authStore";

export function handleUnauthorized() {
  alert(
    "It seems that there is an issue with your authentication. Please sign in again.",
  );
  const authStore = useAuthStore();
  authStore.signOut();

  router.replace("/signin");
}
