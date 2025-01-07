import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RadioButton from 'react-native-radio-button'
import { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import DocumentPicker, { types } from 'react-native-document-picker';
import useUploadPersonalInfo from '../../hooks/useUploadPersonalInfo'


const PersonalInfo = () => {

    const { handleUploadPersonal, loading } = useUploadPersonalInfo()
    const [gender, setGender] = useState("male")
    const [imgUrl, setImgUrl] = useState("")
    const [imgFile, setImgFile] = useState(null)
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: ""
    })





    const pickImage = async () => {
        try {
            const result = await DocumentPicker.pickSingle({
                type: [types.images],
                allowMultiSelection: false
            })
            console.log(result);

            setImgUrl(result?.uri)
            setImgFile(result)

        } catch (error) {
            console.log(error?.message);

            // Alert.alert("Error in Picking an Image: ", error?.message)
        }
    }




    const handlePersonalInfo = async () => {
        const formData = new FormData()
        formData.append("first_name", inputs.firstName)
        formData.append("last_name", inputs.lastName)
        formData.append("gender", gender)
        if (imgFile) {
            formData.append("profile_pic", {
                uri: imgFile.uri,
                name: imgFile.name,
                type: imgFile.type
            })
        }
        await handleUploadPersonal(formData)
    }
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <Input value={inputs.firstName} onValueChange={(text) => setInputs({ ...inputs, firstName: text })} label={"First Name"} placeholder={"First Name"} />
                    <Input value={inputs.lastName} onValueChange={(text) => setInputs({ ...inputs, lastName: text })} label={"Last Name"} placeholder={"Last Name"} />
                </View>
                <RadioInputs gender={gender} setGender={setGender} />
                <UploadPic imgUrl={imgUrl} handlePress={pickImage} />
                <TouchableOpacity onPress={handlePersonalInfo} style={{ marginTop: "10%", width: "90%", height: 64, marginHorizontal: "auto", backgroundColor: "#FA4A0C", padding: 10, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {
                        loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ color: "#fff", fontSize: 24, fontFamily: "OpenSans-Regular" }}>Continue</Text>
                    }
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

export default PersonalInfo

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
                <Text style={{ color: "#fff", fontSize: 18, fontFamily: "OpenSans-Bold", textAlign: "center" }}>Enter Personal Information</Text>
            </View>
        </View>
    )
}

const Input = ({ placeholder, label, value, onValueChange }) => {
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
                        <TextInput value={value} onChangeText={onValueChange} placeholderTextColor={"#000"} style={{ height: 50, borderColor: "#D6D6D6", borderWidth: 1, borderRadius: 10, padding: 10, fontFamily: "OpenSans-Regular", elevation: 5, backgroundColor: "#fff", paddingLeft: 20, color: "#000" }} placeholder={placeholder} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const RadioInputs = ({ gender, setGender }) => {
    return (
        <View style={{ padding: "5%" }}>
            <View>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 16, color: "#000000" }}>Select Your  Gender</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20, marginTop: "5%" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={gender === "Male"}
                        onPress={() => setGender("Male")}
                        size={10}
                        innerColor={gender === "Male" ? "#FA4A0C" : "#fff"}
                        outerColor={"#000"}
                    />
                    <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 16, color: "#000000", marginLeft: 10 }}>Male</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={gender === "Female"}
                        onPress={() => setGender("Female")}
                        size={10}
                        innerColor={gender === "Female" ? "#FA4A0C" : "#fff"}
                        outerColor={"#000"}
                    />
                    <Text style={{ marginLeft: 10, fontFamily: "OpenSans-Regular", fontSize: 16, color: "#000000" }}>Female</Text>
                </View>
            </View>
        </View>
    )
}

const UploadPic = ({ handlePress, imgUrl }) => {
    return (
        <View style={{ padding: "5%" }}>
            <View>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 16, color: "#000000" }}>Upload Profile Picture</Text>
            </View>
            <View style={{ backgroundColor: "#fff", elevation: 5, marginTop: "5%", borderRadius: 10, padding: "5%", borderColor: "#D6D6D6", borderWidth: 1, paddingHorizontal: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Image source={{ uri: imgUrl ? imgUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                    </View>
                    <TouchableOpacity onPress={handlePress} style={{ padding: 10, borderRadius: 10, borderColor: "#D6D6D6", borderWidth: 1, elevation: 5, backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View>
                            <Entypo name="image" size={20} />
                        </View>
                        <View>
                            <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 14, color: "#000000", textAlign: "center" }}>Upload Photo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}