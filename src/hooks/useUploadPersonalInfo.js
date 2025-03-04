import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { getDocs } from '../store/docSlice'
import useShowToast from './useShowToast'



const useUploadPersonalInfo = () => {
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const handleUploadPersonal = async (data) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/infoUpdate`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res?.data) {
                showToast({ type: "success", text1: "Success", text2: "Peronsal Info Has been Added" })
                dispatch(getDocs({ token }))
                setTimeout(() => navigation.goBack(), 500);
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in uploading personal info ", text2: error })
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

