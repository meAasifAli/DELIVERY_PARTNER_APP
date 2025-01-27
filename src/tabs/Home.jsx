import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState, } from 'react'
import MapView, { Marker, } from 'react-native-maps'
const { height } = Dimensions.get("window")
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useOrder } from '../context/OrderContext'
import { useDispatch, useSelector } from 'react-redux'
import Status from '../components/Status'
import { initialiseSocket } from '../config/socket'
import useConfirmOrder from '../hooks/useConfirmOrder'
import useArriveOrder from '../hooks/useArriveorder'
import useDeliverOrder from '../hooks/useDeliverOrder'
import MapViewDirections from 'react-native-maps-directions'
import { API_KEY } from '../config/url'
import Geolocation from '../config/location'
import { setLocation } from '../store/locationSlice'
import haversineDistance from 'haversine-distance'







const Home = () => {

    const mapRef = useRef(null);
    const { startLocation } = useSelector((state) => state.location)
    const { isNewOrder, placeOrder, newOrder, isOnline, deliveryStatus, setDeliveryStatus } = useOrder()
    const { token } = useSelector((state) => state?.auth)
    const [isAtResturant, setIsAtResturant] = useState(false)
    const socket = initialiseSocket(token);
    const [btnStatus, setBtnStatus] = useState("confirmed")
    const [isconfirmed, setIsConfirmed] = useState(false);
    const { handleConfirmOrder, loading } = useConfirmOrder()
    const { handleArrivedOrder } = useArriveOrder()
    const { handleDeliverOrder } = useDeliverOrder()
    const [isArrived, setIsArrived] = useState(false)


    // console.log("startLocation: ", startLocation);



    const startLat = startLocation?.latitude
    const startLon = startLocation?.longitude
    const restaurantLat = parseFloat(newOrder?.orderDetails?.restaurant_latitude);
    const restaurantLon = parseFloat(newOrder?.orderDetails?.restaurant_longitude);
    const userLat = parseFloat(newOrder?.orderDetails?.user_latitude);
    const userLon = parseFloat(newOrder?.orderDetails?.user_longitude);

    // console.log(newOrder);





    useEffect(() => {
        if (!isOnline) return;


        socket.on("connect", () => {
            console.log("Delivery Boy Connected");

            socket.emit("deliveryBoyConnect", {
                location: {
                    lat: startLat,
                    lng: startLon,
                },
                status: "online",
            });




            if (newOrder && isconfirmed) {
                socket.emit("updateDeliveryBoyLocation", {
                    location: {
                        lat: startLat,
                        lng: startLon,
                    },
                    order_id: newOrder?.orderDetails?.order_id,
                });
            }
        });

        socket.on("newOrderNotification", (data) => {
            placeOrder(data);
        });

        socket.on("disconnect", (reason) => {
            console.log("Delivery Boy disconnected", reason);
        });

        const watchId = getUpdatedLocation();
        // Cleanup function
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("deliveryBoyConnect")
            socket.off("newOrderNotification");
            socket.off("updateDeliveryBoyLocation")
            socket.disconnect();
            if (watchId) {
                Geolocation.clearWatch(watchId);
            }
        };
    }, [isOnline, token, startLat, startLon, newOrder, isconfirmed]);


    const dispatch = useDispatch()


    const getUpdatedLocation = () => {
        const watchId = Geolocation.watchPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Update Redux state
                dispatch(setLocation({
                    latitude: location.lat,
                    longitude: location.lng,
                }));

                // if (newOrder?.orderDetails?.order_id) {
                //     socket.emit("updateDeliveryLocation", {
                //         location,
                //         order_id: newOrder.orderDetails.order_id,
                //     });
                // }

                // // Check if the delivery boy is at the restaurant (within 100 meters)
                const distanceToRestaurant = haversineDistance(
                    { latitude: location.lat, longitude: location.lng },
                    { latitude: restaurantLat, longitude: restaurantLon }
                );

                const distanceToUser = haversineDistance({ latitude: location.lat, longitude: location.lng },
                    { latitude: userLat, longitude: userLon })

                console.log("Distance to Restaurant:", distanceToRestaurant);
                console.log("Distance to User: ", distanceToUser);


                if (distanceToRestaurant <= 100) {
                    setIsAtResturant(true);
                } else {
                    setIsAtResturant(false);
                }

                if (distanceToUser <= 100) {
                    setIsArrived(true)
                }
                else {
                    setIsArrived(false)
                }
            },
            (error) => {
                console.error("Error fetching location:", error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 10, // Trigger update every 10 meters
            }
        );

        return watchId;
    };


    const handleArrived = async () => {
        setBtnStatus("delivered")
        await handleArrivedOrder(newOrder?.orderDetails?.order_id)
    }

    const handleConfirm = async () => {
        setBtnStatus("arrived");
        setIsConfirmed(pre => !pre)

        if (!newOrder || !newOrder.orderDetails || !newOrder.orderDetails.order_id) {
            console.error("No order details available for confirmation");
            return;
        }
        try {
            await handleConfirmOrder(newOrder?.orderDetails?.order_id);
            console.log("Order confirmed successfully");
        } catch (error) {
            console.error("Error in handleConfirm:", error);
        }
    };


    const handleDeliver = async () => {
        await handleDeliverOrder(newOrder?.orderDetails?.order_id)
        Alert.alert("Order Delivered Successfully")
        clearOrder()
    }
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
                style={{ flex: 1 }}
                provider={'google'}
                initialRegion={{
                    latitude: startLat,
                    longitude: startLon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >


                <Marker
                    coordinate={{
                        latitude: startLat,
                        longitude: startLon,
                    }}
                    title="Delivery Boy Start Location"
                />


                {
                    restaurantLat && restaurantLon && <Marker
                        coordinate={{
                            latitude: restaurantLat,
                            longitude: restaurantLon,
                        }}
                        title="Restaurant Location"
                    />
                }

                {userLat && userLon && (
                    <Marker
                        coordinate={{
                            latitude: userLat,
                            longitude: userLon
                        }}
                        title="User Last Location"
                    />
                )}

                {
                    newOrder && <MapViewDirections
                        strokeWidth={10}
                        origin={{
                            latitude: startLat,
                            longitude: startLon,
                        }}
                        destination={{
                            latitude: userLat,
                            longitude: userLon
                        }}
                        apikey={API_KEY}
                        onReady={(result) => {
                            if (mapRef.current) {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        top: 50,
                                        right: 50,
                                        bottom: 50,
                                        left: 50,
                                    },
                                    animated: true,
                                });
                            }
                        }}
                    />
                }
            </MapView>

            {
                isNewOrder && <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "#202020", borderTopStartRadius: 20, borderTopEndRadius: 20, zIndex: 1, padding: "5%" }}>
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
                            btnStatus === "arrived" && isArrived && <TouchableOpacity onPress={handleArrived} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
                                <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 12 }}>Arrived Order</Text>
                            </TouchableOpacity>
                        }
                        {
                            btnStatus === "confirmed" && isAtResturant && <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
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


