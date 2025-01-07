import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useOrder } from '../context/OrderContext'


const useAcceptOrder = () => {
    const { setIsNewOrder } = useOrder()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state?.auth)
    const handleAcceptOrder = async (orderId) => {

        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/acceptOrder?order_id=${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Order Has been Accepted")
                navigation.goBack()
                setIsNewOrder(pre => !pre)
            }
        } catch (error) {
            Alert.alert("Error in Accepting Order: ", error?.response?.data?.message)
            console.error("Error in Accepting Order: ", error?.response?.data?.message)
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleAcceptOrder, loading }
}

export default useAcceptOrder

