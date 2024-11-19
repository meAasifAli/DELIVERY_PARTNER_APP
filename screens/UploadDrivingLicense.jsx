import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react'
import ReactNativeModal from 'react-native-modal'

const UploadDrivingLicense = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={{ marginBottom: 10 }}>
                <View style={{ padding: "5%", borderStyle: "dashed", borderBottomColor: "#D6D6D6", borderBottomWidth: 1, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: "OpenSans-Regular",
                            textAlign: "center",
                            lineHeight: 21,
                            maxWidth: "90%",
                            marginHorizontal: "auto",
                            letterSpacing: 0.05
                        }}
                    >
                        Provide sharp images of the documents
                        below for quicker verification.
                    </Text>
                </View>
                <LicenseUpload />
                <UploadedLicense />
                <TouchableOpacity onPress={() => setIsOpen(pre => !pre)} style={{ marginVertical: "10%", backgroundColor: "#FA4A0C", borderRadius: 10, height: 50, display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginHorizontal: "auto" }}>
                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Medium", textAlign: "center", }}>Submit</Text>
                </TouchableOpacity>
                <ReactNativeModal
                    isVisible={isOpen}
                    onBackdropPress={() => setIsOpen(pre => !pre)}
                    style={{ flex: 1 }}
                    animationIn={"bounceInUp"}
                    animationInTiming={1000}
                    animationOut={"bounceOutDown"}
                    animationOutTiming={1000}
                >
                    <View style={{ backgroundColor: "#fff", height: 200, width: "90%", marginHorizontal: "auto", borderRadius: 20, padding: "5%" }}>
                        <Text
                            style={{
                                fontFamily: "OpenSans-Regular",
                                fontSize: 14,
                            }}
                        >
                            Thank You for submiting documents we
                            will review the uploaded documents and
                            revert back to you soon!
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("registration-complete")} style={{ marginVertical: "15%", backgroundColor: "#FA4A0C", borderRadius: 10, height: 50, display: "flex", justifyContent: "center", alignItems: "center", width: "50%", marginHorizontal: "auto" }}>
                            <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Medium", textAlign: "center", }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ReactNativeModal>
            </ScrollView>
        </View>
    )
}

export default UploadDrivingLicense

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
            <View >
                <Text style={{ color: "#fff", fontSize: 20, fontFamily: "OpenSans-Regular", textAlign: "center" }}>Upload Personal Documents</Text>
            </View>
        </View>
    )
}

const LicenseUpload = () => {
    return (
        <View style={{ marginTop: "10%", padding: "5%", width: "90%", marginHorizontal: "auto", borderStyle: "dashed", borderColor: "#6D6D6D", borderWidth: 1, borderRadius: 10 }}>
            <View>
                <Text
                    style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: 16
                    }}
                >Your name and photo Should be clearly
                    visible on the front of your Driving License.
                </Text>
            </View>
            <View style={{ marginTop: "40%" }}>
                <TouchableOpacity style={{
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

const UploadedLicense = () => {
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
                    Upload Back-Side photo and details
                    should be clearly Visible.
                </Text>
            </View>
            {/* adhar card */}
            <View style={{ marginVertical: 20, width: "70%", marginHorizontal: "auto", borderStyle: "dashed", borderWidth: 1, borderColor: "#969AA4", borderRadius: 10 }}>
                <Image style={{ width: "100%", objectFit: "contain", height: 150 }} source={{
                    uri: "https://cdn.pixabay.com/photo/2022/11/09/00/44/aadhaar-card-7579588_640.png"
                }} />
            </View>
            <View style={{}}>
                <TouchableOpacity style={{
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
                    <MaterialIcons name="clear" size={20} color="#FA4A0C" />
                    <Text style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: 16,
                        color: "#FA4A0C",
                    }}>Uploaded</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
