export function buildHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export function buildRequest(method: "POST", body: any): RequestInit {
  if (method === "POST") {
    return {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    };
  } else {
    throw new Error("Not implemented");
  }
}
