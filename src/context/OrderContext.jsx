import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [newOrder, setNewOrder] = useState(null);
    const [isOnline, setIsOnline] = useState(false)
    const placeOrder = (order) => {
        setNewOrder(order); // Set new order details
    };

    const clearOrder = () => {
        setNewOrder(null);
        setIsNewOrder(false)
    };

    return (
        <OrderContext.Provider value={{ newOrder, placeOrder, clearOrder, setIsNewOrder, isNewOrder, isOnline, setIsOnline }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
