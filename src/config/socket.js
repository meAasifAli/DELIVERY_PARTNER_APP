import { io } from "socket.io-client";
import { BASE_URI } from "./url";


let socket;
export const initialiseSocket = (token) => {
    socket = io(BASE_URI, {
        transports: ["websocket"],
        query: {
            token
        }
    })
    return socket
}
