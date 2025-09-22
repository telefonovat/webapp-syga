import { router } from "@/router";
import { useAuthStore } from "@/store/user/authStore";

export async function handleUnauthorized() {
  const authStore = useAuthStore();
  await authStore.verifyAuth();

  if (!authStore.isAuthenticated) {
    authStore.signOut();
    alert(
      "It seems that there is an issue with your authentication. Please sign in again.",
    );
    router.replace("/signin");
  }

  alert("Please try again");
}
