import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'

const useUploadWorkPreference = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)

    const handleUploadWorkPreference = async (type) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/workUpdate`, {
                type
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Work Shift has been Submitted Successfully")
                setTimeout(() => navigation.reset({
                    index: 0,
                    routes: [{ name: "registration-complete" }]
                }), 500)
            }
        } catch (error) {
            console.error("Error in uploading Work shiftings: ", error?.response)
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadWorkPreference, loading }
}

export default useUploadWorkPreference
