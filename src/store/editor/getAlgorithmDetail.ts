import { buildHeaders, getAlgorithmResourceUrl } from "@/api";
import { handleUnauthorized } from "@/api/auth";
import {
  GetAlgorithmDetailSuccessBody,
  SygaAlgorithmPublicData,
} from "@telefonovat/syga--contract";

export async function getAlgorithmDetail(
  uuid: string,
): Promise<SygaAlgorithmPublicData> {
  const response = await fetch(getAlgorithmResourceUrl(uuid), {
    method: "GET",
    headers: buildHeaders(),
    credentials: "include",
  });

  if (response.status === 401) {
    handleUnauthorized();
  }

  const body: GetAlgorithmDetailSuccessBody = await response.json();
  if (!body.success) {
    alert("Error: trouble getting algorithm");
  }

  return body.payload;
}
