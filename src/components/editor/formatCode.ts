import { buildRequest, formatUrl } from "@/api";

export async function formatCode(code: string): Promise<string> {
  const response = await fetch(
    formatUrl,
    buildRequest("POST", JSON.stringify({ code })),
  );
  const body = await response.json();

  if (!body.formattedCode) {
    throw new Error(
      "Tried to format code but the API returned nothing",
    );
  }

  const formattedCode: string = body.formattedCode;

  return formattedCode;
}
