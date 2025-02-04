import { View, Text, Switch, StyleSheet, ToastAndroid } from "react-native";
import { useOrder } from "../context/OrderContext";
import { useEffect } from "react";


const Status = () => {
    const { isOnline, setIsOnline } = useOrder()
    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.CENTER, ToastAndroid.LONG);
    };

    useEffect(() => {
        if (isOnline) {
            showToast('✅ You are online! Ready to receive new orders.');
        } else {
            showToast('⚠️ You are offline.');
        }
    }, [isOnline]);

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
