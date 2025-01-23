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
import { getDistance } from 'geolib'





const Home = () => {

    const mapRef = useRef(null);
    const { startLocation } = useSelector((state) => state.location)
    const { isNewOrder, placeOrder, newOrder, isOnline } = useOrder()
    const { token } = useSelector((state) => state?.auth)
    const [isAtResturant, setIsAtResturant] = useState(false)

    // console.log(startLocation);



    const startLat = startLocation?.latitude
    const startLon = startLocation?.longitude
    const restaurantLat = parseFloat(newOrder?.orderDetails?.restaurant_latitude);
    const restaurantLon = parseFloat(newOrder?.orderDetails?.restaurant_longitude);
    const userLat = parseFloat(newOrder?.orderDetails?.user_latitude);
    const userLon = parseFloat(newOrder?.orderDetails?.user_longitude);

    // console.log(newOrder);





    useEffect(() => {
        if (!isOnline) return;

        // Initialize the socket
        const socket = initialiseSocket(token);

        socket.on("connect", () => {
            console.log("Delivery Boy Connected");

            socket.emit("deliveryBoyConnect", {
                location: {
                    lat: startLocation?.latitude,
                    lng: startLocation?.longitude,
                },
                status: "online",
            });



            if (newOrder) {
                const updatedLocation = getUpdatedLocation();
                socket.emit("updateDeliveryBoyLocation", {
                    location: {
                        lat: updatedLocation?.latitude,
                        lng: updatedLocation?.longitude,
                    },
                    order_id: newOrder?.orderDetails?.order_id,
                });
                return () => {
                    Geolocation.clearWatch(updatedLocation);
                }
            }


        });

        socket.on("newOrderNotification", (data) => {
            placeOrder(data);
        });

        socket.on("disconnect", (reason) => {
            console.log("Delivery Boy disconnected", reason);
        });

        // Cleanup function
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("newOrderNotification");
            socket.disconnect();
        };
    }, [isOnline, token, startLocation, newOrder]);


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

                // Check if the delivery boy is at the restaurant (within 100 meters)
                const distance = getDistance(
                    { latitude: location.lat, longitude: location.lng },
                    { latitude: restaurantLat, longitude: restaurantLon }
                );

                console.log("Distance to Restaurant:", distance);

                if (distance <= 1500) {
                    setIsAtResturant(true);
                } else {
                    setIsAtResturant(false);
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
                isNewOrder && <BottomPopup isAtResturant={isAtResturant} />
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


const BottomPopup = ({ isAtResturant }) => {

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
                    btnStatus === "confirmed" && <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
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