import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { getDocs } from '../store/docSlice'
import useGetDeliveryDocStatus from './useGetDeliveryDocStatus'




const useUploadAdhar = () => {
    const { handleGetDeliveryDocStatus } = useGetDeliveryDocStatus()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const handleUploadAdhar = async (data) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/adharUpdate`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res?.data) {
                Alert.alert("Adhar Card Has been Uploaded Successfully")
                await handleGetDeliveryDocStatus()
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            console.error("Error in uploading Adhar ", error?.response?.data?.message)
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadAdhar, loading }
}

export default useUploadAdhar
