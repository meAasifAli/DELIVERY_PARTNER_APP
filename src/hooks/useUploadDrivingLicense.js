import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import useGetDeliveryDocStatus from './useGetDeliveryDocStatus'
import useShowToast from './useShowToast'




const useUploadDrivingLicense = () => {
    const showToast = useShowToast()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const { handleGetDeliveryDocStatus } = useGetDeliveryDocStatus()
    const handleUploadDL = async (data) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/dlUpdate`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res?.data) {
                showToast({ type: "success", text1: "Success", text2: "Driving License Has been Uploaded Successfully" })
                await handleGetDeliveryDocStatus()
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in uploading DL ", text2: error?.response?.data?.message })
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadDL, loading }
}

export default useUploadDrivingLicense
