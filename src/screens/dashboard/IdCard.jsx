import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const IdCard = () => {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: "#fff", flex: 1, position: "relative" }}>
            <View style={{ position: "absolute", top: -10, zIndex: 0 }}>
                <Image style={{ height: 330, resizeMode: "contain" }} source={require("../../assets/images/ellipse.png")} />
            </View>
            <View style={{ position: "absolute", top: 20, left: 50, flexDirection: "row", alignItems: "center", gap: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={20} color={"#fff"} />
                </TouchableOpacity>
                <Text style={{ color: "#fff", fontFamily: "OpenSans-Semibold", fontSize: 18 }}>Identity Card</Text>
            </View>
            <View style={{ position: "absolute", top: 100, left: 30, width: "85%", marginHorizontal: "auto", zIndex: 1, alignItems: "center", padding: 20 }}>
                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", height: 400, width: "100%", elevation: 2, marginHorizontal: "auto", borderRadius: 15 }}>
                    <View style={{ marginTop: 30 }}>
                        <Image style={{ width: 100, height: 100, borderRadius: 50, resizeMode: "contain" }} source={require("../../assets/images/owais.png")} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 18, textAlign: "center", marginTop: 10 }}>Owais Parvez</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: "OpenSans-Semibold", fontSize: 14, textAlign: "center", color: "#A09E9E" }}>courier ID: <Text style={{ color: "#000" }}>12345</Text></Text>
                    </View>
                    <View style={{ marginTop: 20, paddingHorizontal: 20, }}>
                        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: "OpenSans-Semibold", fontSize: 14, color: "#A09E9E" }}>Phone Number: </Text>
                            <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 14, color: "#000" }}>7889423564</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: "OpenSans-Semibold", fontSize: 14, color: "#A09E9E" }}> Address: </Text>
                            <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 14, color: "#000" }}>Srinagar, j&k</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: "OpenSans-Semibold", fontSize: 14, color: "#A09E9E" }}> Photo ID (PAN): </Text>
                            <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 14, color: "#000" }}>FPMPM6875M</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontFamily: "OpenSans-Semibold", fontSize: 14, color: "#A09E9E" }}> Blood Group: </Text>
                            <Text style={{ fontFamily: "OpenSans-Bold", fontSize: 14, color: "#000" }}>O+</Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", backgroundColor: "#FA4A0C", marginTop: "auto", borderBottomStartRadius: 15, borderBottomEndRadius: 15 }}>
                        <Text style={{ fontFamily: "OpenSans-Semibold", fontSize: 12, color: "#fff", padding: 10, textAlign: "center" }}> Valid only for food & grocery distribution </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default IdCard

const styles = StyleSheet.create({})