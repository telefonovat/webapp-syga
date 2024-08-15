import { REST_API, connector } from "./connector";

const BUILD_ENDPOINT = "/algorithm/execute";

async function buildCode({ code }: { code: string }): Promise<void> {
  await connector.post(REST_API + BUILD_ENDPOINT, {
    code: code
  })
    .then((res) => {
      console.log("Success");
      console.log(res.data);
    })
    .catch((_err) => {
      console.log("Error");
    });

}

export { buildCode };
