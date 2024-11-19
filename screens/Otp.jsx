import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const { height } = Dimensions.get("window")
import { useNavigation } from '@react-navigation/native'
import { OtpInput } from 'react-native-otp-entry'


const Otp = () => {
    const navigation = useNavigation()
    return (
        <KeyboardAvoidingView
            behavior={null}
            keyboardVerticalOffset={50}
            style={styles.container}>
            <View>
                <Image source={require("../assets/images/pana.png")} style={{ height: height * 0.35, width: "100%", resizeMode: "contain" }} />
            </View>
            <View
                style={styles.bottomContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <OtpForm navigation={navigation} />
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
        height: "50%",
        width: "100%",
        backgroundColor: "#202020",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    otpWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 16
    },
    otpPinCodeContainer: {
        backgroundColor: "#fff",
        height: 70,
        width: 70
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

const OtpForm = ({ navigation }) => {
    return (
        <ScrollView>
            <Heading />
            <SecondaryHeading />
            <OtpInputs />
            <Option />
            <ButtonComponent />
        </ScrollView>
    )
}



const Heading = () => {
    return (
        <Text style={{ color: "#fff", fontSize: 40, fontFamily: "OpenSans-Bold", lineHeight: 54, textAlign: "center", paddingVertical: "2%" }}>Verify OTP</Text>
    )
}

const SecondaryHeading = () => {
    return (
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
    )
}

const OtpInputs = ({ setOtp }) => {
    return (
        <View style={styles.otpWrapper}>
            <OtpInput
                focusColor={"#fff"} theme={{
                    pinCodeContainerStyle: styles.otpPinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText
                }} numberOfDigits={4} onTextChange={(text) => console.log(text)} />
        </View>
    )
}

const Option = () => {
    return (
        <View style={styles.optionWrapper}>
            <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Regular", lineHeight: 21 }}>Didn’t get the code? Resend in: </Text>
            <Text style={{ color: "#FA4A0C", fontSize: 16, fontFamily: "OpenSans-Medium", lineHeight: 21 }}>0.59</Text>
        </View>
    )
}

const ButtonComponent = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("onboarding")} style={{ backgroundColor: "#FA4A0C", padding: "4%", borderRadius: 10, width: "80%", alignItems: "center", marginHorizontal: "auto", marginTop: "2%" }}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500", fontFamily: "OpenSans-Medium" }}>Continue</Text>
        </TouchableOpacity>
    )
}