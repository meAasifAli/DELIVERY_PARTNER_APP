import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import useUploadBankDetails from '../../hooks/useUpdateBankDetails'

const BankAccountDetails = () => {
    const { handleUploadBankDetails } = useUploadBankDetails()
    const [inputs, setInputs] = useState({
        accountNumber: "",
        reEnterAccountNumber: "",
        bankName: "",
        ifscCode: ""
    })

    const handleUpload = async () => {
        if (inputs.accountNumber !== inputs.reEnterAccountNumber) {
            return alert("Account Number does not match")
        }

        await handleUploadBankDetails({
            account_no: inputs.accountNumber,
            bank_name: inputs.bankName,
            IFSC_code: inputs.ifscCode
        })
    }
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Input val={inputs.accountNumber} setVal={(text) => setInputs({ ...inputs, accountNumber: text })} label={"Account Number"} placeholder={"16 digit Bank Account Number"} />
                <Input val={inputs.reEnterAccountNumber} setVal={(text) => setInputs({ ...inputs, reEnterAccountNumber: text })} label={"Re-Enter Account Number"} placeholder={"Re-enter 16 digit Bank Account Number"} />
                <Input val={inputs.bankName} setVal={(text) => setInputs({ ...inputs, bankName: text })} label={"Bank Name"} placeholder={"Bank Name"} />
                <Input val={inputs.ifscCode} setVal={(text) => setInputs({ ...inputs, ifscCode: text })} label={"IFSC Code"} placeholder={"IFSC Code"} />
            </ScrollView>
            <TouchableOpacity onPress={handleUpload} style={{ marginVertical: "15%", backgroundColor: "#FA4A0C", borderRadius: 10, height: 50, display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginHorizontal: "auto" }}>
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Medium", textAlign: "center", }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BankAccountDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: "#202020", borderBottomStartRadius: 25, borderBottomEndRadius: 25, padding: "7%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" color="#fff" size={20} />
            </TouchableOpacity>
            <View>
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Bold", textAlign: "center" }}>Enter Bank Information</Text>
            </View>
        </View>
    )
}

const Input = ({ placeholder, label, val, setVal }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ width: "90%", marginHorizontal: "auto", marginTop: "5%" }}>
                    <View>
                        <Text style={{
                            color: "#202020", fontSize: 16, fontFamily: "OpenSans-Regular",
                        }}>{label}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <TextInput value={val} onChangeText={setVal} placeholderTextColor={"#000"} style={{ height: 50, borderColor: "#D6D6D6", borderWidth: 1, borderRadius: 10, padding: 10, fontFamily: "OpenSans-Regular", elevation: 5, backgroundColor: "#fff", paddingLeft: 20, color: "#000" }} placeholder={placeholder} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}