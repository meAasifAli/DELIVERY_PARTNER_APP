import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'



const useUploadPersonalInfo = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const handleUploadPersonal = async ({ first_name, last_name, gender, profile_pic }) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/infoUpdate`, {
                first_name, last_name, gender, profile_pic
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Peronsal Info Has been Added")
                navigation.navigate("Delivery Documents")
            }
        } catch (error) {
            console.error("Error in uploading personal info ", error?.response?.data?.message)
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadPersonal, loading }
}

export default useUploadPersonalInfo

