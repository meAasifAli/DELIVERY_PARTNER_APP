import axios from 'axios'
import { useState } from 'react'
import { Alert, StyleSheet, } from 'react-native'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setToken } from '../store/authSlice'


const useVerifyOtp = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    const handleLogin = async (givenOTP, phone_no) => {
        try {
            setLoading(true)
            const res = await axios.post(`${BASEURL}/api/deliveryBoy/deliveryLogin/${phone_no}`, {
                givenOTP
            })
            if (res?.data) {
                dispatch(setToken(res?.data?.token))
                navigation.navigate("onboarding")
            }
        } catch (error) {
            Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleLogin, loading }
}

export default useVerifyOtp

