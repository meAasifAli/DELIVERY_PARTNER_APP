import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useSelector } from 'react-redux'
import useShowToast from './useShowToast'




const useArriveOrder = () => {
    const showToast = useShowToast()
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
                showToast({ type: "success", text1: "Success", text2: "Order Has been Arrived" })
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in Arriving Order: ", text2: error?.response?.data?.message })
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

