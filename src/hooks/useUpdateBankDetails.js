import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ToastAndroid } from 'react-native'
import { getDocs } from '../store/docSlice'
import useShowToast from './useShowToast'




const useUploadBankDetails = () => {
    const showToast = useShowToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector((state) => state?.auth)
    const handleUploadBankDetails = async ({
        account_no,
        bank_name,
        IFSC_code }) => {
        try {
            setLoading(true)
            const res = await axios.patch(`${BASEURL}/api/deliveryBoy/bankUpdate`, {
                account_no,
                bank_name,
                IFSC_code
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                showToast({ type: "success", text1: "Success", text2: "Bank Details Has been Uploaded Successfully" })
                dispatch(getDocs({ token }))
                setTimeout(() => navigation.goBack(), 500)
            }
        } catch (error) {
            showToast({ type: "error", text1: "Error in uploading Bank Details", text2: error?.response?.data?.message })
            console.error("Error in uploading Bank Details", error?.response?.data?.message)
            // Alert.alert("Error in authenticating user: ", error?.response?.data?.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }
    return { handleUploadBankDetails, loading }
}

export default useUploadBankDetails
