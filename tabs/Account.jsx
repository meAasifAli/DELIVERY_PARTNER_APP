import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AccountScreen from "../screens/Account"
import { Text, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import IdCard from "../screens/IdCard"
import BankDetails from "../screens/BankDetails"
import EmergencyDetails from "../screens/EmergencyDetails"
import { useNavigation } from "@react-navigation/native"


const Stack = createNativeStackNavigator()


const Account = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AccountScreen} options={{
                header: () => (
                    <View style={{ flexDirection: "row", display: "flex", alignItems: "center", elevation: 2, backgroundColor: "#fff", height: 50, paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={20} />
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontSize: 18, textAlign: "center", fontFamily: "OpenSans-Bold" }}>Profile</Text>
                    </View>
                )
            }} />
            <Stack.Screen name="IdCard" component={IdCard} options={{
                header: () => (
                    <View style={{ flexDirection: "row", display: "flex", alignItems: "center", elevation: 2, backgroundColor: "#fff", height: 50, paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                            <Ionicons name="arrow-back" size={20} />
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontSize: 18, textAlign: "center", fontFamily: "OpenSans-Bold" }}>I&apos;D CARD</Text>
                    </View>
                )
            }} />
            <Stack.Screen name="BankDetails" component={BankDetails} options={{
                header: () => (
                    <View style={{ flexDirection: "row", display: "flex", alignItems: "center", elevation: 2, backgroundColor: "#fff", height: 50, paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                            <Ionicons name="arrow-back" size={20} />
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontSize: 18, textAlign: "center", fontFamily: "OpenSans-Bold" }}>Bank Details</Text>
                    </View>
                )
            }} />
            <Stack.Screen name="EmergencyDetails" component={EmergencyDetails} options={{
                header: () => (
                    <View style={{ flexDirection: "row", display: "flex", alignItems: "center", elevation: 2, backgroundColor: "#fff", height: 50, paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                            <Ionicons name="arrow-back" size={20} />
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontSize: 18, textAlign: "center", fontFamily: "OpenSans-Bold" }}>Emergency Details</Text>
                    </View>
                )
            }} />

        </Stack.Navigator>
    )
}

export default Account



