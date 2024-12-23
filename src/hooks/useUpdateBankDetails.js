import axios from 'axios'
import { useState } from 'react'
import { BASEURL } from '../config/url'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'




const useUploadBankDetails = () => {
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
                Alert.alert("Bank Details Has been Uploaded Successfully")
                navigation.goBack()
            }
        } catch (error) {
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
