import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";
import createAdapter from "@socket.io/redis-adapter";
import { createClient } from "redis";
import cors from "cors";
import diContainer from "./lib/diContainer";
import keys from "./config/keys";

const configureExpress = () => {
  const di = diContainer();
  const pubClient = createClient({
    host: keys.redisHost,
    port: keys.redisPort,
  });
  const subClient = pubClient.duplicate();

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  io.adapter(createAdapter(pubClient, subClient));

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/", routes);

  di.register("name", "decobike-miami-beach");
  di.register("app", app);
  di.register("io", io);

  di.factory("bikesController", require("./controllers/bikes"));
  di.factory("client", require("./utils/api-client"));
  di.factory("bikesService", require("./services/bikes"));
  di.factory("ioService", require("./services/io"));

  const ioInit = di.get("ioService");

  return httpServer;
};

export default async () => {
  const app = configureExpress();
  return app;
};
