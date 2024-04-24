import { ServerOptions } from "socket.io";
import dotenv from "dotenv";

export function loadConfig() {
  const config = {
    SOCKET_IO_SERVER_OPTIONS: {},
    PORT: process.env.PORT,
  };

  if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: "../.env.development" });
    const SOCKET_IO_SERVER_OPTIONS: Partial<ServerOptions> = {
      cors: {
        origin: process.env.APP_ALLOW_ORIGIN,
      },
    };
    config.SOCKET_IO_SERVER_OPTIONS = SOCKET_IO_SERVER_OPTIONS;
    config.PORT = process.env.PORT;
  }

  return config;
}
