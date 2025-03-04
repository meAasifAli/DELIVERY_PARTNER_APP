import { createContext, useContext, useState } from 'react';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [newOrder, setNewOrder] = useState(null);
    const [isOnline, setIsOnline] = useState(false)
    const [deliveryStatus, setDeliveryStatus] = useState("")
    const [deliveryCoords, setDeliveryCoords] = useState({
        latitude: 0,
        longitude: 0
    })
    const placeOrder = (order) => {
        setNewOrder(order);
    };

    const clearOrder = () => {
        setNewOrder(null);
        setIsNewOrder(false)
    };

    return (
        <OrderContext.Provider value={{ deliveryCoords, setDeliveryCoords, newOrder, placeOrder, clearOrder, setIsNewOrder, isNewOrder, isOnline, setIsOnline, deliveryStatus, setDeliveryStatus }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
