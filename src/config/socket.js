import { io } from "socket.io-client";
import { BASEURL } from "./url";


let socket;
export const initialiseSocket = (token) => {
    socket = io(BASEURL, {
        transports: ["websocket"],
        query: {
            token
        }
    })

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
    });
    return socket
}

