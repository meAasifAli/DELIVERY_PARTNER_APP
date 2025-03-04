import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useSelector } from 'react-redux'
import { Alert, ToastAndroid } from 'react-native'
import useShowToast from './useShowToast'



const useConfirmOrder = () => {
    const showToast = useShowToast()
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
                showToast({ type: "success", text1: "Success", text2: "Order Has been Confirmed" })
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in confirming Order: ", text2: "error?.response?.data?.message" })
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleConfirmOrder, loading }
}

export default useConfirmOrder

