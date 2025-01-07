import { io } from "socket.io-client";
import { BASEURL } from "./url";


let socket;
export const initialiseSocket = (token) => {
    socket = io(BASEURL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        timeout: 10000,
        query: {
            token
        }
    })
    return socket
}

