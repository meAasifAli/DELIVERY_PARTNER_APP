import axios from 'axios'
import { useState } from 'react'
import { Alert, } from 'react-native'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, } from 'react-redux'
import { setIsAuthenticated, setIsDocVerified, setToken } from '../store/authSlice'
import useShowToast from './useShowToast'


const useVerifyOtp = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const showToast = useShowToast()


    const handleLogin = async (givenOTP, phone_no) => {
        try {
            setLoading(true)
            const res = await axios.post(`${BASEURL}/api/deliveryBoy/deliveryLogin/${phone_no}`, {
                givenOTP
            })
            if (res?.data) {
                const { approved, token } = res?.data
                dispatch(setToken(token))
                dispatch(setIsDocVerified(approved))
                if (approved === "declined") {
                    showToast({ type: "error", text1: "Declined", text2: "Your account has been declined by admin" })
                }
                approved === "waiting" ? navigation.navigate("onboarding") : dispatch(setIsAuthenticated(true))
            }
        } catch (error) {
            console.error("Error in authenticating user: ", error?.response?.data?.message)
            showToast({ type: "error", text1: "Error in authenticating user: ", text2: error?.response?.data?.message })
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleLogin, loading }
}

export default useVerifyOtp

