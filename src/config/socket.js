import { io } from "socket.io-client";
import { BASEURL } from "./url";

let socket;

export const initialiseSocket = (token) => {
    if (!token) {
        console.error("⚠️ Token is missing, cannot initialize socket.");
        return null;
    }

    socket = io(BASEURL, {
        transports: ["websocket"],
        query: { token },
        reconnectionAttempts: 10,
        reconnectionDelay: 3000,
        timeout: 5000,
    });

    socket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
        console.warn("⚠️ Socket Disconnected:", reason);
    });

    return socket;
};
