import {io} from "socket.io-client"

let socket

export const initiateSocketConnection = () => {
    socket = io(import.meta.env.VITE_API_BASE_URL, {
        transports: ["websocket"],
      });

    socket.on("connect", () => {
        console.log("Connected to websocket server");
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });

    return socket;
}

export const getSocket = () => socket;
