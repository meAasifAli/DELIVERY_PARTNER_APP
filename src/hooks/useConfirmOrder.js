import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'



const useConfirmOrder = () => {
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state?.auth)
    const handleConfirmOrder = async (orderId) => {

        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/confirmOrder?order_id=${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Order Has been Confirmed")
            }
        } catch (error) {
            Alert.alert("Error in confirming Order: ", error?.response?.data?.message)
            console.error("Error in confirming Order: ", error?.response)

            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleConfirmOrder, loading }
}

export default useConfirmOrder

