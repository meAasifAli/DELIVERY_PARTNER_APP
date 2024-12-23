import axios from "axios"
import { useEffect, useState } from "react"
import { BASEURL } from "../config/url"
import { useAuthStore } from "../store/useAuthStore"
import { useSelector } from "react-redux"



const useGetDeliveryDocStatus = () => {
    const [loading, setLoading] = useState(false)
    const [pendingDocs, setPendingDocs] = useState([])
    const [completedDocs, setCompletedDocs] = useState([])
    const { token } = useSelector((state) => state?.auth)




    const handleGetDeliveryDocStatus = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${BASEURL}/api/deliveryBoy/getPersonalDocsStatus`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res?.data) {
                setPendingDocs(res?.data?.data?.pendingDocuments)
                setCompletedDocs(res?.data?.data?.completedDocuments)
            }
        } catch (error) {
            setLoading(false)
            console.error("Error in getting docs status: ", error?.response?.data?.message)
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, handleGetDeliveryDocStatus, completedDocs, pendingDocs }
}

export default useGetDeliveryDocStatus

