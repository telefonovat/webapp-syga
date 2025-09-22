import { buildHeaders, verifyAuthUrl } from "@/api";
import { AuthenticateSuccessResponse } from "@telefonovat/syga--contract";

export async function isAuthValid():
  | undefined
  | AuthenticateSuccessResponse {
  const response = await fetch(verifyAuthUrl, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "include",
  });

  if (response.status === 401) {
    return undefined;
  }
  return true;
}
