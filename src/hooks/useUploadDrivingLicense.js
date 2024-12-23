import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'




const useUploadDrivingLicense = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const handleUploadDL = async ({ dl_front,
        dl_back, }) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/dlUpdate`, {
                dl_front,
                dl_back,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                Alert.alert("Adhar Card Has been Uploaded Successfully")
                navigation.goBack()
            }
        } catch (error) {
            console.error("Error in uploading DL ", error?.response?.data?.message)
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
