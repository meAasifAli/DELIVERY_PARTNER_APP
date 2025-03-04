import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated } from '../store/authSlice'
import { Alert, ToastAndroid } from 'react-native'
import useShowToast from './useShowToast'


const useApproveDocs = () => {
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state?.auth)
    const handleAuthUser = async () => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/sendForApproval`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                showToast({ type: "success", text1: "Success", text2: "Your Documents has been sent for the approval" })
                dispatch(setIsAuthenticated(true))
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in sending docs for the approval", text2: error?.response?.data?.message })
            console.error("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleAuthUser, loading }
}

export default useApproveDocs

