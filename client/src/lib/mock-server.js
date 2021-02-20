import { Server, Model, hasMany, belongsTo } from "miragejs";

export const USER_ID = 1;
export const MOCK_TASKS = [{ description: "Visit bank" }];

export default function runMockServer() {
  new Server({
    urlPrefix: process.env.REACT_APP_API_URL,
    namespace: "/api",

    models: {
      user: Model.extend({
        tasks: hasMany(),
      }),

      task: Model.extend({
        user: belongsTo(),
      }),
    },

    seeds(server) {
      let user = server.create("user", {
        username: "smithjohn",
        email: "smithjohn@gmail.com",
      });

      MOCK_TASKS.forEach((task) => {
        server.create("task", { user, ...task });
      });
    },

    routes() {
      this.get("/:user_id/tasks/get", (schema, request) => {
        let userId = request.params.user_id;
        let user = schema.users.find(userId);

        return {
          data: user.tasks.models,
        };
      });

      this.post("/:user_id/tasks/add", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const user = schema.users.find(request.params.user_id);

        const newTask = schema.tasks.create({
          ...body,
          user,
        });

        return {
          data: newTask,
        };
      });
    },
  });
}
