import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'



const useArriveOrder = () => {
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state?.auth)
    const handleArrivedOrder = async (orderId) => {

        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/arrivedOrder?order_id=${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Order Has been Arrived")
            }
        } catch (error) {
            Alert.alert("Error in Arriving Order: ", error?.response?.data?.message)
            console.error("Error in Arriving Order: ", error?.response)

            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleArrivedOrder, loading }
}

export default useArriveOrder

