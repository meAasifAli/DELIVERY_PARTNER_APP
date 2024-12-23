import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'




const useUploadVehicleDetails = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const handleUploadVehicleDetails = async ({
        vehicle_no,
        registration_no,
        vehicle_type,
        vehicle_image }) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/vehicleUpdate`, {
                vehicle_no,
                registration_no,
                vehicle_type,
                vehicle_image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Vehicle Details Has been Uploaded Successfully")
                navigation.goBack()
            }
        } catch (error) {
            console.error("Error in uploading Vehicle Delivery Details", error?.response?.data?.message)
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
