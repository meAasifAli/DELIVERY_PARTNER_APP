import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useOrder } from '../../context/OrderContext';
import { useNavigation } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

import SwipeButton from 'rn-swipe-button';

const OrderRequest = () => {
    const navigation = useNavigation()
    const { newOrder, clearOrder, setIsNewOrder } = useOrder();
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (!newOrder) {
            navigation.goBack(); // Close if no order
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);

                    // Wrap the `clearOrder` and `navigation.goBack` calls in `setTimeout`
                    // to ensure they don't conflict with rendering.
                    setTimeout(() => {
                        clearOrder(); // Clear the order after timeout
                        navigation.goBack();
                    }, 0);
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [newOrder, navigation, clearOrder]);

    const handleAccept = () => {
        clearOrder(); // Clear order when accepted
        navigation.goBack();
        setIsNewOrder(true)
    };
    const CheckoutButton = () => {
        return (
            <View style={{ width: 100, height: "100%", backgroundColor: '#fff', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                <Entypo color="#FA4A0C" size={20} name="chevron-right" />
                <View style={{ marginLeft: -15 }}>
                    <Entypo color="#FA4A0C" size={25} name="chevron-right" />
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#202020", padding: "5%" }}>
            <View style={{ marginHorizontal: "auto", marginVertical: 20, borderColor: "#FA4A0C", borderWidth: 7, borderRadius: 100 }}>
                <Image source={require("../../assets/images/map.png")} style={{ borderRadius: 50, resizeMode: "contain" }} />
            </View>
            <View>
                <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 24, textAlign: "center" }}>New Order!</Text>
            </View>
            <View style={{ marginTop: "10%", width: "90%", marginHorizontal: "auto", }}>
                <View style={{ borderColor: "#6D6D6D", borderWidth: 1, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                    <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 20, textAlign: "center", padding: "5%" }}>Expected Earning : <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: 20 }}> Rs 75</Text></Text>
                </View>
                <View style={{ borderColor: "#6D6D6D", borderWidth: 1, borderBottomStartRadius: 10, borderBottomEndRadius: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ borderRightColor: "#6D6D6D", borderRightWidth: 1, padding: "5%", display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 14, textAlign: "center", padding: "5%" }}>Pickup : <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: 14 }}> 3 km</Text></Text>
                    </View>
                    <View style={{ borderRightColor: "#6D6D6D", borderRightWidth: 1, padding: "5%", display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 14, textAlign: "center", padding: "5%" }}>Drop: <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: 14 }}> 3.3 km</Text></Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: "10%", width: "90%", marginHorizontal: "auto", borderColor: "#6D6D6D", borderRadius: 10, padding: "5%", borderWidth: 1 }}>
                <View>
                    <Text style={{
                        fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 15, textTransform: "uppercase", lineHeight: 22, fontWeight: "300"
                    }}>pickup from</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: "OpenSans-Medium", color: "#fff", fontSize: 15, textTransform: "uppercase", lineHeight: 23 }}>Samci Restaurant</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 13, textTransform: "uppercase", lineHeight: 22 }}>102, Ist floor, Rehmat Apartments Rajbagh Srinagar</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <IonIcons name="timer-outline" color="#fff" size={20} />
                    <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 13, textTransform: "uppercase", lineHeight: 22 }}>5m Away</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end", padding: "5%" }}>
                <SwipeButton
                    containerStyles={{ borderRadius: 15 }}
                    height={50}
                    // onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
                    // onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
                    onSwipeSuccess={handleAccept}
                    railBackgroundColor="#FA4A0C"
                    // railStyles={{ borderRadius: 15, }}
                    thumbIconComponent={CheckoutButton}
                    // thumbIconImageSource={arrowRight}
                    // thumbIconStyles={{ borderRadius: 5 }}
                    // thumbIconWidth={100}
                    title="Accept Order"
                    titleColor='#fff'
                    titleStyles={{ fontFamily: "OpenSans-Semibold" }}

                />
                {/* <TouchableOpacity onPress={handleAccept} style={{ backgroundColor: "#FA4A0C", height: 50, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25 }}>
                    <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 20 }}>Accept Order</Text>
                </TouchableOpacity> */}
            </View>
        </View>

    )
}

export default OrderRequest

const styles = StyleSheet.create({})