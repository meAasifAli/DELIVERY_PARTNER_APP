import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useOrder } from "../context/OrderContext";


const Status = () => {

    const { latitude, longitude } = useSelector((state) => state?.location)
    const { isOnline, setIsOnline } = useOrder()

    const toggleSwitch = () => {
        setIsOnline(pre => !pre)
    };







    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: "#ddd", true: "#FA4A0C" }}
                thumbColor={isOnline ? "#fff" : "#aaa"}
                ios_backgroundColor="#ddd"
                onValueChange={toggleSwitch}
                value={isOnline}
            />
            <Text style={[styles.statusText, { color: isOnline ? "#FA4A0C" : "#aaa" }]}>
                {isOnline ? "Online" : "Offline"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    statusText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 14,
        marginLeft: 5,
        color: "#000"
    },
});

export default Status
