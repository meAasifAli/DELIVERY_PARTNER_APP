import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import AuthenticatedUserStack from './AuthenticatedUserStack'
import UnAuthenticatedUserStack from './UnAuthenticatedUserStack'
import Geolocation from '@react-native-community/geolocation'
import { useEffect } from 'react'
import { setLocation } from '../store/locationSlice'
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions'
const AppNavigator = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, docVerified } = useSelector((state) => state.auth)

    const requestLocationPermission = async () => {
        try {
            let permission;
            if (Platform.OS === 'android') {
                permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
            } else {
                permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
            }

            const status = await check(permission);

            if (status === RESULTS.GRANTED) {
                console.log('Location permission already granted');
                getCurrentLocation();
            } else {

                const result = await request(permission);
                if (result === RESULTS.GRANTED) {
                    console.log('Location permission granted');
                    getCurrentLocation();
                } else {
                    console.log('Location permission denied');
                    Alert.alert(
                        'Permission Required',
                        'We need location permission to proceed. Please enable it in your settings.',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Open Settings', onPress: openAppSettings },
                        ]
                    );
                }
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                dispatch(setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }))
            },
            (error) => {
                console.error('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 20000 }
        );
    };

    useEffect(() => {
        requestLocationPermission();
    }, []);
    return (
        <NavigationContainer>
            {
                isAuthenticated && docVerified === "approved" ?
                    (
                        <AuthenticatedUserStack />
                    )
                    :
                    (
                        <UnAuthenticatedUserStack />
                    )
            }
        </NavigationContainer>
    )
}

export default AppNavigator

