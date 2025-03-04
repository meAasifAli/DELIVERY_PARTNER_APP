import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setOtp } from '../store/authSlice'
import useShowToast from './useShowToast'


const useAuth = () => {
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const handleAuthUser = async (phone_no) => {
        try {
            setLoading(true)
            const res = await axios.post(`${BASEURL}/api/deliveryBoy/deliverySendOtp`, {
                phone_no
            })
            if (res?.data) {
                dispatch(setOtp(res?.data?.otp))
                navigation.navigate("otp")
            }
        } catch (error) {
            console.error(error?.response?.data?.message)
            showToast({ type: "error", text1: "Error in authenticating user: ", text2: error?.response?.data?.message })
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleAuthUser, loading }
}

export default useAuth

