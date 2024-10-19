import axios from "axios";


const connector = axios.create({

});

import { Frame } from "@/shared/Frame";
const REST_API = "/api"
const BUILD_ENDPOINT = "/algorithm/execute";
//TODO: More specific return typing
async function buildCode({ code }: { code: string }): Promise<Frame[]> {
  try {
    // const res = await connector.post(REST_API + BUILD_ENDPOINT, {
    //   code: code,
    // });
    // console.log("Success");
    // console.log(res.data.frames); // Log the frames
    // return res.data.frames; // Return the frames
    const res = await fetch("http://localhost:8020/algorithm/execute",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code }),
      });
    console.log(await res.json());
    return [];


  } catch (err) {
    console.error("Error occurred:", err);
    return []; // Return an empty array or handle the error as needed
  }
}

export { buildCode };
