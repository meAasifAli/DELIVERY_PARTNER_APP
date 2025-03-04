import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'
import useGetDeliveryDocStatus from './useGetDeliveryDocStatus'
import useShowToast from './useShowToast'




const useUploadPan = () => {
    const showToast = useShowToast()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const { handleGetDeliveryDocStatus } = useGetDeliveryDocStatus()
    const handleUploadPan = async (data) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/panUpdate`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res?.data) {
                showToast({ type: "success", text1: "Success", text2: "PAN Card Has been Uploaded Successfully" })
                await handleGetDeliveryDocStatus()
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in uploading PAN ", text2: error?.response?.data?.message })
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadPan, loading }
}

export default useUploadPan
