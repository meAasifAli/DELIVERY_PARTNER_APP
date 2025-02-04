import { createContext, useContext, useEffect, useState } from "react";
import { initialiseSocket } from "../config/socket"
import { OrderContext } from "./OrderContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, token }) => {
    const [socket, setSocket] = useState(null);
    const { isOnline } = useContext(OrderContext)

    useEffect(() => {
        if (!isOnline) return
        if (token) {
            const newSocket = initialiseSocket(token);
            setSocket(newSocket);
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [token, isOnline]);

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
