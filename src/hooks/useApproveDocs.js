import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated } from '../store/authSlice'
import { Alert } from 'react-native'


const useApproveDocs = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state?.auth)
    const handleAuthUser = async () => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/sendForApproval`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Your Documents has been sent to the approval")
                dispatch(setIsAuthenticated(true))
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

export default useApproveDocs

