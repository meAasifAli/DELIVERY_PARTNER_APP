import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useSelector } from 'react-redux'
import { Alert, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useOrder } from '../context/OrderContext'
import useShowToast from './useShowToast'


const useAcceptOrder = () => {
    const showToast = useShowToast()
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
                showToast({
                    type: "success",
                    text1: "success",
                    text2: "You have Accepted the order",
                })
                navigation.goBack()
                setIsNewOrder(pre => !pre)
            }
        } catch (error) {
            showToast({
                type: "error",
                text1: "Error in accepting the order: ",
                text2: error?.response?.data?.message,
            })
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

