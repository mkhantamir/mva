import { Server, Socket } from "socket.io";
import { errorHandler } from "./errorHandler";

export const socketHandler =
  (fn: (socket: Socket, io: Server) => void) =>
  (socket: Socket, io: Server) => {
    try {
      fn(socket, io);
    } catch (error: any) {
      errorHandler(error, socket);
    }
  };
