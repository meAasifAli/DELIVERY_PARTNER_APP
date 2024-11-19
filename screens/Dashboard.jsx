import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../tabs/Home'
import Account from '../tabs/Account'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useOrder } from '../context/OrderContext'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
const Tab = createBottomTabNavigator()

const Dashboard = () => {
    const navigation = useNavigation()
    const { newOrder, } = useOrder();

    useEffect(() => {
        if (newOrder) {
            navigation.navigate('order-request'); // Navigate to the popup screen if there's a new order
        }
    }, [newOrder]);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#FA4A0C",
                tabBarInactiveTintColor: "#202020",
                tabBarLabelStyle: {
                    fontFamily: "OpenSans-Medium",
                    fontSize: 12,
                },
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 10
                }
            }}
        >
            <Tab.Screen name='home' component={Home} options={{
                headerShown: false,
                tabBarIcon: ({ size, color, focused }) => (
                    <View style={{
                        backgroundColor: focused ? "#E8DEF8" : "#fff",
                        height: 32,
                        width: 64,
                        marginHorizontal: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", borderRadius: 16,
                    }}>
                        <AntDesign name="home" size={size} color={color} />
                    </View>
                )
            }} />
            <Tab.Screen name='account' component={Account} options={{
                headerShown: false,
                tabBarIcon: ({ size, color, focused }) => (
                    <View style={{
                        backgroundColor: focused ? "#E8DEF8" : "#fff",
                        height: 32,
                        width: 64,
                        marginHorizontal: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", borderRadius: 16,
                    }}>
                        <IonIcons name="person-circle-outline" size={size} color={color} />
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

export default Dashboard

const styles = StyleSheet.create({})