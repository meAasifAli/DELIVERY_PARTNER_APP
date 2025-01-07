import { Alert, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState, } from 'react'
import MapView, { Marker, Polyline, } from 'react-native-maps'
const { height } = Dimensions.get("window")
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useOrder } from '../context/OrderContext'
import { useSelector } from 'react-redux'
import Status from '../components/Status'
import { initialiseSocket } from '../config/socket'
import polyline from '@mapbox/polyline'
import useConfirmOrder from '../hooks/useConfirmOrder'
import useArriveOrder from '../hooks/useArriveorder'
import useDeliverOrder from '../hooks/useDeliverOrder'





const Home = () => {
    const mapRef = useRef(null);
    const { startLocation } = useSelector((state) => state.location)
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const { isNewOrder, placeOrder, newOrder, clearOrder, isOnline } = useOrder()
    const { token } = useSelector((state) => state?.auth)

    // console.log(startLocation);

    const startLat = startLocation?.latitude
    const startLon = startLocation?.longitude
    const destLat = parseFloat(newOrder?.orderDetails?.latitude);
    const destLon = parseFloat(newOrder?.orderDetails?.longitude);

    console.log(newOrder);


    useEffect(() => {

        if (isNewOrder && mapRef.current) {
            // Define the region to animate to
            const targetRegion = {
                latitude: 34.074744,
                longitude: 74.820444,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };

            // Animate the map to the region
            mapRef.current.animateToRegion(targetRegion, 1000);
        }
    }, [isNewOrder])


    useEffect(() => {
        const socket = initialiseSocket(token)

        socket.on("connect", () => {
            console.log("Delivery Boy Connected");
            if (isOnline) {
                socket.emit("deliveryBoyConnect", {
                    location: {
                        lat: 34.074744,
                        lng: 74.820444
                        // lat: startLat ? startLat : 51.511076,
                        // lng: startLon ? startLon : -0.122156,
                    },
                    status: "online"
                })
            }


            socket.emit("updateDeliveryBoyLocation", {
                location: { lat: 34.074744, lng: 74.820444 },
                order_id: newOrder?.orderDetails?.order_id,
            });

        })




        socket.on("newOrderNotification", (data) => {
            placeOrder(data)
        })

        socket.on("disconnect", (reason) => {
            console.log("Delivery Boy disconnected", reason);
        })



        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('newOrderNotification');
            socket.off("updateDeliveryBoyLocation")
            socket.disconnect()
            // clearInterval(intervalId); // Clear the interval
        };
    }, [isOnline])


    useEffect(() => {
        const key = "pk.8f2a73d9ff72a2b8a7fc9626d06d6e12";
        const fetchRoute = async () => {
            const response = await fetch(
                `https://us1.locationiq.com/v1/directions/driving/74.820444,34.074744;74.8250,34.0694?key=${key}&steps=true&alternatives=true&geometries=polyline&overview=full`
            );
            const data = await response.json();

            // console.log(data);
            if (response.ok) {
                // Decode polyline geometry
                const geometry = data.routes[0].geometry;
                const decodedCoordinates = polyline.decode(geometry).map(([latitude, longitude]) => ({
                    latitude,
                    longitude,
                }));

                setRouteCoordinates(decodedCoordinates);
            } else {
                console.error("Error fetching route:", data);
            }
        };
        if (newOrder) {
            fetchRoute();
        }
    }, [newOrder]);



    return (
        <View style={styles.container}>
            <View style={{ position: "absolute", top: 0, width: "100%", backgroundColor: "#202020", borderBottomStartRadius: 20, borderBottomEndRadius: 20, zIndex: 1, height: height * 0.10, padding: "5%" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Status />
                    <View>
                        <IonIcons name="notifications-outline" color="#fff" size={25} />
                    </View>
                </View>
            </View >
            <MapView
                ref={mapRef}
                showsScale
                style={{ flex: 1 }}
                provider={'google'}
                showsUserLocation={true}
                followsUserLocation
                showsMyLocationButton
                initialRegion={{
                    latitude: 34.074744,
                    longitude: 74.820444,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >


                <Marker
                    coordinate={{
                        latitude: 34.074744,
                        longitude: 74.820444,
                    }}
                    title="Delivery Boy Start Location"
                />





                {newOrder?.orderDetails?.latitude != null && newOrder?.orderDetails?.longitude != null && (
                    <Marker
                        coordinate={{
                            latitude: 34.0694,
                            longitude: 74.8250
                        }}
                        title="User Last Location"
                    />
                )}

                {/* Draw the Polyline */}
                {routeCoordinates.length > 0 && newOrder && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#0000FF" // Blue
                        strokeWidth={8}
                        style={{ flex: 1, zIndex: 100 }}
                    />
                )}
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


const BottomPopup = () => {
    const [btnStatus, setBtnStatus] = useState("confirmed")
    const { handleConfirmOrder, loading } = useConfirmOrder()
    const { handleArrivedOrder } = useArriveOrder()
    const { handleDeliverOrder } = useDeliverOrder()
    const { newOrder, clearOrder } = useOrder()


    const handleArrived = async () => {
        setBtnStatus("delivered")
        await handleArrivedOrder(newOrder?.orderDetails?.order_id)
    }

    const handleConfirm = async () => {
        setBtnStatus("arrived")
        await handleConfirmOrder(newOrder?.orderDetails?.order_id)
    }

    const handleDeliver = async () => {
        await handleDeliverOrder(newOrder?.orderDetails?.order_id)
        Alert.alert("Order Delivered Successfully")
        clearOrder()
    }
    return (
        <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "#202020", borderTopStartRadius: 20, borderTopEndRadius: 20, zIndex: 1, padding: "5%" }}>
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
                {
                    btnStatus === "arrived" && <TouchableOpacity onPress={handleArrived} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
                        <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 12 }}>Arrived Order</Text>
                    </TouchableOpacity>
                }
                {
                    btnStatus === 'confirmed' && <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
                        <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 12 }}>Confirm Order</Text>
                    </TouchableOpacity>
                }
                {
                    btnStatus === "delivered" && <TouchableOpacity onPress={handleDeliver} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
                        <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 12 }}>deliver Order</Text>
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}