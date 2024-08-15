import Frame from "@/interfaces/backend/Frame";
import { REST_API, connector } from "./connector";

const BUILD_ENDPOINT = "/algorithm/execute";
//TODO: More specific return typing
async function buildCode({ code }: { code: string }): Promise<Frame[]> {
  try {
    const res = await connector.post(REST_API + BUILD_ENDPOINT, {
      code: code,
    });
    console.log("Success");
    console.log(res.data.frames); // Log the frames
    return res.data.frames; // Return the frames
  } catch (err) {
    console.error("Error occurred:", err);
    return []; // Return an empty array or handle the error as needed
  }
}

export { buildCode };
