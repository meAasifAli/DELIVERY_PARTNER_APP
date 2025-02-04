import { Platform, Alert, StatusBar } from 'react-native';
import { useContext, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthenticatedUserStack from './AuthenticatedUserStack';
import UnAuthenticatedUserStack from './UnAuthenticatedUserStack';
import Geolocation from '../config/location';
import { PERMISSIONS, RESULTS, check, request, openSettings } from 'react-native-permissions';
import { OrderContext } from '../context/OrderContext';
import { SocketProvider } from '../context/Socketprovider';

const AppNavigator = () => {
    const { setDeliveryCoords, deliveryStatus } = useContext(OrderContext);
    const { isAuthenticated, docVerified } = useSelector((state) => state.auth);
    const watchIdRef = useRef(null);
    const { token } = useSelector((state) => state.auth);

    const requestLocationPermission = async () => {
        try {
            const permission = Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

            const status = await check(permission);
            if (status === RESULTS.GRANTED) {
                console.log('✅ Location permission already granted');
                getCurrentLocation();
            } else {
                const result = await request(permission);
                if (result === RESULTS.GRANTED) {
                    console.log('✅ Location permission granted');
                    getCurrentLocation();
                } else {
                    console.log('❌ Location permission denied');
                    Alert.alert(
                        'Permission Required',
                        'We need location permission to proceed. Please enable it in your settings.',
                        [{ text: 'Cancel', style: 'cancel' }, { text: 'Open Settings', onPress: openSettings }]
                    );
                }
            }
        } catch (error) {
            console.error('🚨 Error checking location permission:', error?.message);
        }
    };

    const getCurrentLocation = () => {
        console.log('📍 Getting initial location...');
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('✅ Initial Location:', position?.coords);
                if (position?.coords) {
                    setDeliveryCoords({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    if (deliveryStatus === "accepted") {
                        startLocationUpdates();
                    } // Start tracking after getting initial location
                }
            },
            (error) => {
                console.error('🚨 Error getting initial location:', error);
                if (error.code === 3) {
                    Alert.alert(
                        'Location Timeout',
                        'Could not retrieve location in time. Try again with a better signal.',
                        [{ text: 'Retry', onPress: getCurrentLocation }]
                    );
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 60000

            }
        );
    };

    const startLocationUpdates = () => {
        if (watchIdRef.current !== null) {
            Geolocation.clearWatch(watchIdRef.current);
        }

        console.log('🔄 Starting location updates...');
        watchIdRef.current = Geolocation.watchPosition(
            (position) => {
                // console.log('🔄 Updated Location:', position?.coords);
                if (position?.coords) {
                    setDeliveryCoords({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                }
            },
            (error) => {
                console.error('🚨 Error getting location updates:', error);
            },
            { enableHighAccuracy: true, distanceFilter: 5, timeout: 30000, maximumAge: 0 }
        );
    };

    // Start and stop location updates based on deliveryStatus
    useEffect(() => {
        requestLocationPermission();

        if (deliveryStatus === "confirmed") {
            startLocationUpdates();
        } else {
            if (watchIdRef.current !== null) {
                Geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        }

        return () => {
            if (watchIdRef.current !== null) {
                Geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        };
    }, [deliveryStatus]); // Run when `deliveryStatus` changes

    return (
        <SocketProvider token={token}>
            <NavigationContainer>
                {isAuthenticated && docVerified === 'approved' ? (
                    <>
                        <StatusBar backgroundColor={"#202020"} barStyle={"light-content"} />
                        <AuthenticatedUserStack />
                    </>

                ) : (
                    <UnAuthenticatedUserStack />
                )}
            </NavigationContainer>
        </SocketProvider>
    );
};

export default AppNavigator;
