import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from 'react'
import RadioButton from 'react-native-radio-button'
import useUploadVehicleDetails from '../../hooks/useUploadVehicleDetails'
import DocumentPicker, { types } from 'react-native-document-picker'


const VehicleDetails = () => {
    const [imgUrl, setImgUrl] = useState("")
    const { handleUploadVehicleDetails } = useUploadVehicleDetails()
    const [inputs, setInputs] = useState({
        vehicleNumber: "",
        registrationNumber: ""
    })
    const [type, setType] = useState("Bike")

    const vehicleUpload = async () => {
        try {
            const result = await DocumentPicker.pickSingle({
                type: [types.images],
                allowMultiSelection: false
            })
            setImgUrl(result)
        } catch (error) {
            Alert.alert("Error in uploading Car: ", error?.message)
        }
    }


    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("vehicle_no", inputs?.vehicleNumber)
        formData.append("registration_no", inputs?.registrationNumber)
        formData.append("vehicle_type", type)
        if (imgUrl) {
            formData.append("vehicle_image", {
                uri: imgUrl?.uri,
                type: imgUrl?.type,
                name: imgUrl?.name
            })
        }
        await handleUploadVehicleDetails(formData)
    }
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Input val={inputs.vehicleNumber} setVal={(text) => setInputs({ ...inputs, vehicleNumber: text })} label={"Vehicle Number"} placeholder={"Enter Vehicle Number"} />
                <Input val={inputs.registrationNumber} setVal={(text) => setInputs({ ...inputs, registrationNumber: text })} label={"Registration Number"} placeholder={"Enter Vehicle Registration Number"} />
                <VehicleType type={type} setType={setType} />
                <VehicleUpload vehcileUri={imgUrl} onUpload={vehicleUpload} />
                <TouchableOpacity onPress={handleUpload} style={{ marginVertical: "10%", backgroundColor: "#FA4A0C", borderRadius: 10, height: 50, display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginHorizontal: "auto" }}>
                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Medium", textAlign: "center", }}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default VehicleDetails

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
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Bold", textAlign: "center" }}>Enter Vehicle Information</Text>
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

const VehicleType = ({ type, setType }) => {
    return (
        <View style={{ padding: "5%" }}>
            <View>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 16, color: "#000000" }}>Select Your  Vehicle </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20, marginTop: "5%" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={type === "Bike"}
                        onPress={() => setType("Bike")}
                        size={10}
                        innerColor={type === "Bike" ? "#FA4A0C" : "#fff"}
                        outerColor={"#000"}
                    />
                    <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 16, color: "#000000", marginLeft: 10 }}>Bike</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={type === "Car"}
                        onPress={() => setType("Car")}
                        size={10}
                        innerColor={type === "Car" ? "#FA4A0C" : "#fff"}
                        outerColor={"#000"}
                    />
                    <Text style={{ marginLeft: 10, fontFamily: "OpenSans-Regular", fontSize: 16, color: "#000000" }}>Car</Text>
                </View>
            </View>
        </View>
    )
}

const VehicleUpload = ({ onUpload, vehcileUri }) => {
    return (
        <View style={{ marginTop: "10%", padding: "5%", width: "90%", marginHorizontal: "auto", borderStyle: "dashed", borderColor: "#6D6D6D", borderWidth: 1, borderRadius: 10 }}>
            <View>
                <Text
                    style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: 16,
                        textAlign: "center"
                    }}
                >
                    Vehicle Image should be clear with
                    Vehicle Number visible on it.
                </Text>
            </View>
            <View style={{ marginVertical: 20, width: "70%", marginHorizontal: "auto", borderStyle: "dashed", borderWidth: 1, borderColor: "#969AA4", borderRadius: 10 }}>
                <Image style={{ width: "100%", objectFit: "cover", height: 150 }} source={{
                    uri: vehcileUri ? vehcileUri?.uri : "https://png.pngtree.com/png-clipart/20210815/original/pngtree-delivery-boy-in-bike-out-for-png-image_6631607.jpg"
                }} />
            </View>
            <View >
                <TouchableOpacity
                    onPress={onUpload}
                    style={{
                        width: "90%",
                        marginHorizontal: "auto",
                        borderColor: "#6D6D6D",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        justifyContent: "center"
                    }}>
                    <Entypo name="image" size={20} color="#FA4A0C" />
                    <Text style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: 16,
                        color: "#FA4A0C"
                    }}>Upload Photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}