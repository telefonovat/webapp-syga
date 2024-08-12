import axios from "axios";

//TODO: Implement proper connector
async function testPost() {
  const instance = axios.create({
    baseURL: "http://0.0.0.0:5100",
  })
  instance.post("/", {

  }).then((res) => {

  })
    .catch((err) => {

    })
  console.log("Posting");
}

export { testPost };
