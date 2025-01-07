import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'



const useDeliverOrder = () => {
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state?.auth)
    const handleDeliverOrder = async (orderId) => {

        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/deliverOrder?order_id=${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Order Has been Delivered")
            }
        } catch (error) {
            Alert.alert("Error in  Order Delivery: ", error?.response?.data?.message)
            console.error("Error in Order Delivery : ", error?.response)

            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleDeliverOrder, loading }
}

export default useDeliverOrder

