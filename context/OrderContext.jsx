import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [newOrder, setNewOrder] = useState(null);

    const placeOrder = (order) => {
        setNewOrder(order); // Set new order details
    };

    const clearOrder = () => {
        setNewOrder(null); // Clear the order once accepted or expired
    };

    return (
        <OrderContext.Provider value={{ newOrder, placeOrder, clearOrder, setIsNewOrder, isNewOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
