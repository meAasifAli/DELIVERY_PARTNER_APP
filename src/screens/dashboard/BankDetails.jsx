import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BankDetails = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
            <Header />
            <View></View>
        </View>
    )
}

export default BankDetails

const styles = StyleSheet.create({})

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: "row", display: "flex", alignItems: "center", height: 50, paddingLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                <Ionicons name="arrow-back" size={20} />
            </TouchableOpacity>
            <Text style={{ flex: 1, fontSize: 18, textAlign: "center", fontFamily: "OpenSans-Bold" }}>Bank Details</Text>
        </View>
    )
}