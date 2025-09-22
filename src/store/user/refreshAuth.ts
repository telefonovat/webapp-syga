import { buildHeaders, refreshTokenUrl, verifyAuthUrl } from "@/api";
import { AuthenticationSuccessBody } from "@telefonovat/syga--contract";

export async function refreshAuth() {
  const response = await fetch(verifyAuthUrl, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(refreshTokenUrl, {
      method: "POST",
      headers: buildHeaders(),
      credentials: "include",
    });

    if (refreshResponse.status === 401) {
      alert("Refresh response is undefined!");
      return undefined;
    }

    return (await refreshResponse.json()) as AuthenticationSuccessBody;
  }

  const body: AuthenticationSuccessBody = await response.json();
  return body;
}
