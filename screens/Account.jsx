import { useNavigation } from '@react-navigation/native'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FA from "react-native-vector-icons/FontAwesome"

const Account = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 15 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ display: "flex", paddingTop: 20, flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <View>
                        <Image style={{ width: 100, height: 100, borderRadius: 50, resizeMode: "contain" }} source={require("../assets/images/owais.png")} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontFamily: "OpenSans-Semibold" }}>Ratings</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, marginTop: 5 }}>
                            <Image style={{ width: 15, height: 15, resizeMode: "contain" }} source={require("../assets/images/star.png")} />
                            <Image style={{ width: 15, height: 15, resizeMode: "contain" }} source={require("../assets/images/star.png")} />
                            <Image style={{ width: 15, height: 15, resizeMode: "contain" }} source={require("../assets/images/star.png")} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontFamily: "OpenSans-Bold", marginTop: 20 }}>Owais Parvez</Text>
                    <Text style={{ fontSize: 14, fontFamily: "OpenSans-Regular" }}>FOOD I&apos;D: 78561</Text>
                </View>
                <View style={{ marginVertical: 15, backgroundColor: "#C5C2C2", height: 1, width: "100%" }} />
                <View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 50 }}>
                        <View>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>Mobile Number</Text>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Regular", textAlign: "center" }}>1234567890</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>Joining Date</Text>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Regular", textAlign: "center" }}>15-10-2022</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, display: "flex", flexDirection: "row", alignItems: "center", gap: 50 }}>
                        <View>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>Service Area</Text>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Regular", textAlign: "center" }}>Srinagar J&K</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>Service Category</Text>
                            <Text style={{ fontSize: 14, fontFamily: "OpenSans-Regular", textAlign: "center" }}>Food</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 15, backgroundColor: "#C5C2C2", height: 1, width: "100%" }} />
                <View>
                    {/* ID CARD */}
                    <TouchableOpacity onPress={() => navigation.navigate("IdCard")} style={{ display: "flex", paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 50 }}>
                            <View style={{ backgroundColor: "#D9D9D9", padding: 5, borderRadius: 15 }}>
                                <AntDesign name="idcard" size={20} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>ID Card</Text>
                            </View>
                        </View>
                        <View >
                            <AntDesign name="right" size={20} color={"#FA4A0C"} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 15, backgroundColor: "#C5C2C2", height: 1, width: "100%" }} />
                    {/* Bank Details */}
                    <TouchableOpacity onPress={() => navigation.navigate("BankDetails")} style={{ display: "flex", paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 50 }}>
                            <View style={{ backgroundColor: "#D9D9D9", padding: 5, borderRadius: 15 }}>
                                <AntDesign name="bank" size={20} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>Bank Details</Text>
                            </View>
                        </View>
                        <View >
                            <AntDesign name="right" size={20} color={"#FA4A0C"} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 15, backgroundColor: "#C5C2C2", height: 1, width: "100%" }} />
                    {/* Emergency Details */}
                    <TouchableOpacity onPress={() => navigation.navigate("EmergencyDetails")} style={{ display: "flex", paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 50 }}>
                            <View style={{ backgroundColor: "#D9D9D9", padding: 5, borderRadius: 15 }}>
                                <FA name="medkit" size={20} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>Emergency Details</Text>
                            </View>
                        </View>
                        <View >
                            <AntDesign name="right" size={20} color={"#FA4A0C"} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 15, backgroundColor: "#C5C2C2", height: 1, width: "100%" }} />
                    {/* App Language */}
                    <View style={{ display: "flex", paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 50 }}>
                            <View style={{ backgroundColor: "#D9D9D9", padding: 5, borderRadius: 15 }}>
                                <FA name="language" size={20} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, fontFamily: "OpenSans-Semibold" }}>App Language</Text>
                            </View>
                        </View>
                        <View >
                            <AntDesign name="right" size={20} color={"#FA4A0C"} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Account

