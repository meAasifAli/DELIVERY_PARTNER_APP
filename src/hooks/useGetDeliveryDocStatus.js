import axios from "axios"
import { useState } from "react"
import { BASEURL } from "../config/url"
import { useSelector } from "react-redux"
import useShowToast from "./useShowToast"



const useGetDeliveryDocStatus = () => {
    const showToast = useShowToast()
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
            showToast({ type: "error", text1: "Error in getting docs status", text2: error?.response?.data?.message })
            console.error("Error in getting docs status: ", error)
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, handleGetDeliveryDocStatus, completedDocs, pendingDocs }
}

export default useGetDeliveryDocStatus

