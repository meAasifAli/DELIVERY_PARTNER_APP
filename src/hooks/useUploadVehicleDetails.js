import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { getDocs } from '../store/docSlice'




const useUploadVehicleDetails = () => {
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
                Alert.alert("Vehicle Details Has been Uploaded Successfully")
                dispatch(getDocs({ token }))
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            console.error("Error in uploading Vehicle Delivery Details", error?.response)
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadVehicleDetails, loading }
}

export default useUploadVehicleDetails
