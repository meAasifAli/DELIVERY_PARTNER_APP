import { Alert, Dimensions, Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState, } from 'react'
import MapView, { Marker, } from 'react-native-maps'
const { height } = Dimensions.get("window")
import { OrderContext, useOrder } from '../context/OrderContext'
import { useSelector } from 'react-redux'
import Status from '../components/Status'
import useConfirmOrder from '../hooks/useConfirmOrder'
import useArriveOrder from '../hooks/useArriveorder'
import useDeliverOrder from '../hooks/useDeliverOrder'
import MapViewDirections from 'react-native-maps-directions'
import { API_KEY } from '../config/url'
import haversineDistance from 'haversine-distance'
import { useSocket } from '../context/Socketprovider'
import FO from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MA from 'react-native-vector-icons/MaterialIcons'







const Home = () => {
    const { deliveryStatus, setDeliveryStatus, deliveryCoords } = useContext(OrderContext)
    const mapRef = useRef(null);
    const { isNewOrder, placeOrder, newOrder, isOnline, } = useOrder()
    const { token } = useSelector((state) => state?.auth)
    const [isAtResturant, setIsAtResturant] = useState(false)

    const [isconfirmed, setIsConfirmed] = useState(false);
    const { handleConfirmOrder, loading } = useConfirmOrder()
    const { handleArrivedOrder } = useArriveOrder()
    const { handleDeliverOrder } = useDeliverOrder()
    const [isArrived, setIsArrived] = useState(false)
    const [routeCalculated, setRouteCalculated] = useState(false);
    const [restaurantCoords, setRestaurantCoords] = useState(null)
    const [userCoords, setUserCoords] = useState(null)
    const previousCoords = useRef(null);
    const rotation = useRef(new Animated.Value(0)).current;



    const socket = useSocket();


    console.log("deliveryCoords: ", deliveryCoords);



    useEffect(() => {
        if (newOrder?.orderDetails) {
            const restaurantLat = parseFloat(newOrder?.orderDetails?.restaurant_latitude);
            const restaurantLon = parseFloat(newOrder?.orderDetails?.restaurant_longitude);
            setRestaurantCoords({ latitude: restaurantLat, longitude: restaurantLon });

            const userLat = parseFloat(newOrder?.orderDetails?.user_latitude);
            const userLon = parseFloat(newOrder?.orderDetails?.user_longitude);
            setUserCoords({ latitude: userLat, longitude: userLon });
        }
    }, [newOrder])



    // console.log(newOrder);





    useEffect(() => {
        if (!socket) return;

        const handleConnect = () => {
            console.log("✅ Delivery Boy Connected");
            socket.emit("deliveryBoyConnect", {
                location: { lat: deliveryCoords?.latitude, lng: deliveryCoords?.longitude },
                status: "online",
            });
        };

        const handlePlaceOrder = (data) => {
            placeOrder(data);
        };

        const handleDisconnect = (reason) => {
            console.log("⚠️ Delivery Boy disconnected", reason);
        };

        // Attach event listeners
        socket.on("connect", handleConnect);
        socket.on("newOrderNotification", handlePlaceOrder);
        socket.on("disconnect", handleDisconnect);

        return () => {
            console.log("🔌 Cleaning up socket listeners...");
            socket.off("connect", handleConnect);
            socket.off("newOrderNotification", handlePlaceOrder);
            socket.off("disconnect", handleDisconnect);
        };
    }, [socket, isOnline, placeOrder]);

    useEffect(() => {
        if (!socket || !isconfirmed || !newOrder?.orderDetails?.order_id) return;

        console.log("📡 Emitting updated location...");
        socket.emit("updateDeliveryBoyLocation", {
            location: { lat: deliveryCoords?.latitude, lng: deliveryCoords?.longitude },
            order_id: newOrder.orderDetails.order_id,
        });
    }, [deliveryCoords, socket, isconfirmed, newOrder]);




    useEffect(() => {
        if (deliveryStatus !== "accepted") return;
        // // Check if the delivery boy is at the restaurant (within 100 meters)
        const distanceToRestaurant = haversineDistance(
            { latitude: deliveryCoords?.latitude, longitude: deliveryCoords?.longitude },
            { latitude: restaurantCoords?.latitude, longitude: restaurantCoords?.longitude }
        );

        const distanceToUser = haversineDistance({ latitude: deliveryCoords?.latitude, longitude: deliveryCoords?.longitude },
            { latitude: userCoords?.latitude, longitude: userCoords?.longitude })

        console.log("Distance to Restaurant:", distanceToRestaurant);
        console.log("Distance to User: ", distanceToUser);


        if (distanceToRestaurant <= 100) {
            setIsAtResturant(true);
        } else {
            setIsAtResturant(false);
        }

        if (distanceToUser <= 100 && isconfirmed) {
            setIsArrived(true)
        }
        else {
            setIsArrived(false)
        }
    }, [deliveryCoords, restaurantCoords, userCoords, isconfirmed, deliveryStatus])

    const handleArrived = async () => {
        setDeliveryStatus("arrived")
        await handleArrivedOrder(newOrder?.orderDetails?.order_id)
    }

    const handleConfirm = async () => {
        setDeliveryStatus("confirmed");
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
                        <Ionicons name="notifications-outline" color="#fff" size={25} />
                    </View>

                </View>
            </View >
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                provider={"google"}
                initialRegion={{
                    latitude: deliveryCoords?.latitude || 34.0662,
                    longitude: deliveryCoords?.longitude || 74.8288,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Delivery Boy Marker with Rotation */}
                <Marker coordinate={{ latitude: deliveryCoords?.latitude, longitude: deliveryCoords?.longitude }} title="Delivery Boy" zIndex={2} />

                {/* <Marker coordinate={{ latitude: deliveryCoords?.latitude, longitude: deliveryCoords?.longitude }} title="Delivery Boy" zIndex={2}>
                    <FO name="motorcycle" size={25} color="#FA4A0C" />
                </Marker> */}

                {/* Restaurant Location */}
                {restaurantCoords && (
                    <Marker coordinate={restaurantCoords} title="Restaurant Location" zIndex={2} />
                    // <Marker coordinate={restaurantCoords} title="Restaurant Location" zIndex={2}>
                    //     <Ionicons name="restaurant" size={25} color={"#FA4A0C"} />
                    // </Marker>
                )}

                {/* User Location */}
                {userCoords && (
                    <Marker coordinate={userCoords} title="user Location" zIndex={2} />
                    // <Marker coordinate={userCoords} title="User" zIndex={1}>
                    //     <MA name="my-location" size={25} color={"#FA4A0C"} />
                    // </Marker>
                )}

                {/* Route between Restaurant and User */}
                {restaurantCoords && userCoords && (
                    <MapViewDirections
                        strokeWidth={10}
                        origin={restaurantCoords}
                        destination={userCoords}
                        apikey={API_KEY}
                        onReady={(result) => {
                            if (!routeCalculated) {
                                setRouteCalculated(true);
                                if (mapRef.current) {
                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                                        animated: true,
                                    });
                                }
                            }
                        }}
                    />
                )}
            </MapView>
            {/* <ConfirmOrder isOpen={isAtResturant} setIsOpen={setIsAtResturant} /> */}

            {
                isNewOrder && <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "#202020", borderTopStartRadius: 20, borderTopEndRadius: 20, zIndex: 1, padding: "5%" }}>
                    <View style={{ borderColor: "#6D6D6D", borderRadius: 10, padding: "5%", borderWidth: 1 }}>
                        <View>
                            <Text style={{
                                fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 15, textTransform: "uppercase", lineHeight: 22, fontWeight: "300"
                            }}>pickup from</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "OpenSans-Medium", color: "#fff", fontSize: 15, textTransform: "uppercase", lineHeight: 23 }}>{newOrder?.orderDetails?.restaurant_name}</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 13, textTransform: "uppercase", lineHeight: 22 }}>{`${newOrder?.orderDetails?.landmark}, ${newOrder?.orderDetails?.street}, ${newOrder?.orderDetails?.area}`}`</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Ionicons name="timer-outline" color="#fff" size={20} />
                            <Text style={{ fontFamily: "OpenSans-Regular", color: "#fff", fontSize: 13, textTransform: "uppercase", lineHeight: 22 }}>{newOrder?.orderDetails?.route_details?.total_distance}</Text>
                        </View>
                        {
                            isArrived && deliveryStatus === "confirmed" && <TouchableOpacity onPress={handleArrived} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
                                <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 12 }}>Arrived Order</Text>
                            </TouchableOpacity>
                        }
                        {
                            isAtResturant && deliveryStatus === "accepted" && <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
                                <Text style={{ color: "#fff", fontFamily: "OpenSans-Medium", fontSize: 12 }}>Confirm Order</Text>
                            </TouchableOpacity>
                        }
                        {
                            deliveryStatus === "arrived" && <TouchableOpacity onPress={handleDeliver} style={{ backgroundColor: "#FA4A0C", height: 40, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 10 }}>
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


