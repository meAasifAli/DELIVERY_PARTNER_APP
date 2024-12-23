import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
const { height } = Dimensions.get("window")
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useOrder } from '../context/OrderContext'

const Home = () => {
    const { isNewOrder } = useOrder()
    return (
        <View style={styles.container}>
            <Header />
            <MapView
                style={{ flex: 1, zIndex: 0 }}
                provider={'google'}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
            </MapView>
            {
                isNewOrder && <BottomPopup />
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative"
    }
})

const Header = () => {
    const { placeOrder } = useOrder()
    const handleOrder = () => {
        const newOrder = { id: 1, details: "Order details here" }; // Example order
        placeOrder(newOrder); // Place the order
    };
    return (
        <View style={{ position: "absolute", top: 0, width: "100%", backgroundColor: "#202020", borderBottomStartRadius: 20, borderBottomEndRadius: 20, zIndex: 1, height: height * 0.10, padding: "5%" }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ backgroundColor: "#fff", borderRadius: 10, display: "flex", alignItems: "flex-end", width: "20%", paddingVertical: 5, paddingHorizontal: 5 }}>
                    <TouchableOpacity style={{ backgroundColor: "#FA4A0C", height: height * 0.035, paddingHorizontal: 5, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontFamily: "OpenSans-Regular", fontSize: 12, }}>Online</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleOrder}>
                    <Text style={{ color: "#fff" }}>place  order</Text>
                </TouchableOpacity>
                <View>
                    <IonIcons name="notifications-outline" color="#fff" size={25} />
                </View>
            </View>
        </View >
    )
}

const BottomPopup = () => {
    return (
        <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "#202020", borderTopStartRadius: 20, borderTopEndRadius: 20, zIndex: 1, height: height * 0.25, padding: "5%" }}>
            <View style={{ borderColor: "#6D6D6D", borderRadius: 10, padding: "5%", borderWidth: 1 }}>
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
        </View>
    )
}