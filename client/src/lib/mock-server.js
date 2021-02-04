import { Server } from "miragejs";

new Server({
  urlPrefix: process.env.REACT_APP_API_URL,
  routes() {
    this.get("/users/", () => {
      return [
        { name: "Angy", surname: "T." },
        { name: "Chris", surname: "B." },
        { name: "Juliana", surname: "Crain" },
      ];
    });
  },
});
