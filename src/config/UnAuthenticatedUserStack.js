import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DeliveryLanding from '../screens/auth/Landing'
import Login from '../screens/auth/Login'
import Otp from '../screens/auth/Otp'
import PartnerOnboarding from '../screens/auth/PartnerOnboarding'
import PersonalInfo from '../screens/auth/PersonalInfo'
import PersonalDocs from '../screens/auth/DeliveryDocs'
import VehicleDetails from '../screens/auth/VehicleDetails'
import BankAccountDetails from '../screens/auth/BankAccountDetails'
import WorkDetails from '../screens/auth/WorkDetails'
import UploadAdhar from '../screens/auth/UploadAdhar'
import UploadPAN from '../screens/auth/UploadPAN'
import UploadDrivingLicense from '../screens/auth/UploadDrivingLicense'
import RegistrationComplete from '../screens/auth/RegistrationComplete'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getDocs } from '../store/docSlice'
import { useNavigation } from '@react-navigation/native'




const Stack = createNativeStackNavigator()
const UnAuthenticatedUserStack = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { completedDocs, pendingDocs } = useSelector(state => state?.doc)
    const { token } = useSelector(state => state?.auth)
    useEffect(() => {
        dispatch(getDocs({ token }))
    }, [])

    // console.log("completed Docs: ", completedDocs);
    // console.log("pending docs", pendingDocs)

    useEffect(() => {
        if (pendingDocs?.length > 0 && completedDocs?.length !== 0) {
            navigation.navigate("onboarding")
        }
    }, [completedDocs, pendingDocs])


    return (
        <Stack.Navigator>
            <Stack.Screen
                name="landing"
                component={DeliveryLanding}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="otp"
                component={Otp}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name="onboarding"
                component={PartnerOnboarding}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Personal Information"
                component={PersonalInfo}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Delivery Documents"
                component={PersonalDocs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Vehicle Details"
                component={VehicleDetails}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Bank Details"
                component={BankAccountDetails}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Work Type"
                component={WorkDetails}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Aadhar Card"
                component={UploadAdhar}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PAN Card"
                component={UploadPAN}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Driving License"
                component={UploadDrivingLicense}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="registration-complete"
                component={RegistrationComplete}
                options={{ headerShown: false, presentation: "modal", animation: "slide_from_bottom", animationDuration: 300 }}
            />






        </Stack.Navigator>
    )
}

export default UnAuthenticatedUserStack

const styles = StyleSheet.create({})