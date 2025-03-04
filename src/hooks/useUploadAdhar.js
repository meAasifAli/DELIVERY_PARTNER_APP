import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import useGetDeliveryDocStatus from './useGetDeliveryDocStatus'
import useShowToast from './useShowToast'




const useUploadAdhar = () => {
    const showToast = useShowToast()
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
                showToast({ type: "success", text1: "Success", text2: "Adhar Card Has been Uploaded Successfully" })
                await handleGetDeliveryDocStatus()
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in uploading Adhar ", text2: error?.response?.data?.message })
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
