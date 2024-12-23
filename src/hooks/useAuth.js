import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setOtp } from '../store/authSlice'


const useAuth = () => {
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
            console.error("Error in authenticating user: ", error?.response)
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleAuthUser, loading }
}

export default useAuth

