import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
const PersonalDocs = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={{ padding: "5%", marginTop: "5%" }}>
                <DocumentItem title={"Aadhar Card"} href="upload-adhar" />
                <DocumentItem title={"PAN Card"} href="upload-pan" />
                <DocumentItem title={"Driving License"} href="upload-driving-license" />
            </View>
        </View>
    )
}

export default PersonalDocs

const styles = StyleSheet.create({
    container: {
        flex: 1
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

const DocumentItem = ({ title, href }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate(href)} style={{ padding: "5%", backgroundColor: "#fff", elevation: 5, borderRadius: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: "3%" }}>
            <View>
                <Text style={{
                    fontFamily: "OpenSans-Regular",
                    fontSize: 16,
                    color: "#000"
                }}>{title}</Text>
            </View>
            <View>
                <Entypo name="chevron-right" size={20} color="#000" />
            </View>
        </TouchableOpacity>
    )
}