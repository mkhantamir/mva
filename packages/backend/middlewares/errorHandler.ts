import { Socket } from "socket.io";

type ErrorType = {
  message: string;
  response?: {
    data?: {
      message?: string;
    };
  };
};

export const errorHandler = (error: ErrorType, socket?: Socket) => {
  if (socket) {
    if (error.response && error.response.data && error.response.data.message) {
      socket.emit("message", error.response.data.message);
    } else {
      socket.emit("message", error.message);
    }
  } else {
    console.error("errorHandler: ", error);
  }
};
