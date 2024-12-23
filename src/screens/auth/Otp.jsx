import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const { height } = Dimensions.get("window")
import { OtpInput } from 'react-native-otp-entry'
import { useAuthStore } from '../../store/useAuthStore'
import { useState } from 'react'
import useVerifyOtp from '../../hooks/useVerifyOtp'
import { useSelector } from 'react-redux'


const Otp = () => {

    const [inputOtp, setInputOtp] = useState("")
    const { handleLogin, loading } = useVerifyOtp()
    const { phone, otp } = useSelector((state) => state?.auth)
    console.log(otp);

    const handleLoginUser = async () => {
        if (!inputOtp) {
            alert("Please enter OTP")
            return
        }
        await handleLogin(inputOtp, phone)
    }
    return (
        <KeyboardAvoidingView
            behavior={null}
            keyboardVerticalOffset={50}
            style={styles.container}>
            <View>
                <Image source={require("../../assets/images/pana.png")} style={{ height: height * 0.35, width: "100%", resizeMode: "contain" }} />
            </View>
            <View
                style={styles.bottomContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ color: "#fff", fontSize: 36, fontFamily: "OpenSans-Bold", lineHeight: 54, textAlign: "center", paddingVertical: "2%" }}>Verify OTP</Text>
                    <View
                        style={{
                            maxWidth: "70%",
                            marginHorizontal: "auto"
                        }}
                    >
                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: "OpenSans-Regular", lineHeight: 27 }}>OTP sent!</Text>
                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: "OpenSans-Regular", lineHeight: 27 }}>Secure your taste journey,
                            one code at a time!</Text>
                    </View>
                    <View style={styles.otpWrapper}>
                        <OtpInput
                            focusColor={"#fff"} theme={{
                                pinCodeContainerStyle: styles.otpPinCodeContainer,
                                pinCodeTextStyle: styles.pinCodeText
                            }} numberOfDigits={4} onTextChange={(text) => setInputOtp(text)} />
                    </View>
                    <View style={styles.optionWrapper}>
                        <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Regular", lineHeight: 21 }}>Didn’t get the code? Resend in: </Text>
                        <Text style={{ color: "#FA4A0C", fontSize: 16, fontFamily: "OpenSans-Medium", lineHeight: 21 }}>0.59</Text>
                    </View>
                    <TouchableOpacity onPress={handleLoginUser} style={{ backgroundColor: "#FA4A0C", padding: "4%", borderRadius: 10, width: "80%", alignItems: "center", marginHorizontal: "auto", marginTop: "2%" }}>
                        {
                            loading ? <ActivityIndicator size={"small"} color={"#fff"} /> : <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500", fontFamily: "OpenSans-Medium" }}>Continue</Text>
                        }
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Otp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    bottomContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        height: "55%",
        width: "100%",
        backgroundColor: "#202020",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    otpWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 16
    },
    otpPinCodeContainer: {
        backgroundColor: "#fff",
        height: 60,
        width: 60
    },
    pinCodeText: {
        color: "#FA4A0C",
        fontWeight: "400",
        fontSize: 40,
        lineHeight: 45.12,
        letterSpacing: 0.05,

    },
    optionWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingLeft: "7%",
        paddingVertical: "2%",
        marginBottom: "1%"
    }
})




