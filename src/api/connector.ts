import axios from "axios";

import { TEST_REST_API as REST_API } from "@/utils/test-data/axiosTest";

const connector = axios.create({

});

export { REST_API, connector };

