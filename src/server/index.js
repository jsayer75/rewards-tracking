import { createServer } from "miragejs";

import userdata from "./mockData";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/userData", () => {
      return {
        userdata,
      };
    });
  },
});
