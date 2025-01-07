import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'
import useGetDeliveryDocStatus from './useGetDeliveryDocStatus'




const useUploadDrivingLicense = () => {
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
                Alert.alert("Driving License Has been Uploaded Successfully")
                await handleGetDeliveryDocStatus()
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            console.error("Error in uploading DL ", error)
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
