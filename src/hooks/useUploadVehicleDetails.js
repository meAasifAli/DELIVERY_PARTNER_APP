import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { getDocs } from '../store/docSlice'
import useShowToast from './useShowToast';




const useUploadVehicleDetails = () => {
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const handleUploadVehicleDetails = async (data) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/vehicleUpdate`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res?.data) {
                showToast({
                    type: "success",
                    text1: "success",
                    text2: "Vehicle Details Uploaded Successfully",
                })
                dispatch(getDocs({ token }))
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in uploading Vehicle Details: ", text2: error?.response?.data?.message })
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadVehicleDetails, loading }
}

export default useUploadVehicleDetails
