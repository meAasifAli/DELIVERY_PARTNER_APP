import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import useGetDeliveryDocStatus from '../../hooks/useGetDeliveryDocStatus'
import { useEffect } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const PersonalDocs = () => {
    const { pendingDocs, completedDocs, handleGetDeliveryDocStatus, loading } = useGetDeliveryDocStatus()

    useEffect(() => {
        handleGetDeliveryDocStatus()
    }, [])
    // console.log(pendingDocs, completedDocs);

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                    <View>
                        <Text style={{ color: "#000", fontFamily: "OpenSans-Medium", fontSize: 20, lineHeight: 27 }}>Pending Docs</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        {
                            pendingDocs?.map((item, id) => {
                                return <PendingDoc key={id} title={item} href={item} />
                            })
                        }

                    </View>
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 30 }}>
                    <View>
                        <Text style={{ color: "#000", fontFamily: "OpenSans-Medium", fontSize: 20, lineHeight: 27 }}>Completed Docs</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View>
                            {
                                completedDocs?.map((item, id) => {
                                    return <CompletedDoc key={id} title={item} href={item} />
                                })
                            }
                            {
                                completedDocs?.length === 0 && <Text style={{ fontFamily: "OpenSans-Regular", textAlign: "center", marginTop: 20 }}>No Completed Doc</Text>
                            }
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: "#FA4A0C", padding: 10, borderRadius: 10, marginBottom: 20, minHeight: 50, display: "flex", justifyContent: "center", alignItems: "center", marginHorizontal: 40 }}>
                    <Text style={{ color: "white", fontFamily: "OpenSans-Bold", fontSize: 16, textAlign: "center" }}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>

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
                <Text style={{ color: "#fff", fontSize: 18, fontFamily: "OpenSans-Bold", textAlign: "center" }}>Upload Delivery Documents</Text>
            </View>
        </View>
    )
}

const PendingDoc = ({ title, href }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate(href)} style={{ backgroundColor: "#fff", padding: 10, borderColor: "#D6D6D6", borderWidth: 0.5, display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 10, minHeight: 50, marginVertical: 5 }}>
            <View>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15 }}>{title}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <EvilIcons name='chevron-right' size={25} color={"#000000"} />
            </View>
        </TouchableOpacity>
    )
}

const CompletedDoc = ({ title }) => {
    return (
        <View style={{ backgroundColor: "#fff", padding: 10, borderColor: "#D6D6D6", borderWidth: 0.5, display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 10, minHeight: 50, marginVertical: 5 }}>
            <View>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#60B246" }}>{title}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <MaterialIcons name='done' size={25} color={"#60B246"} />
            </View>
        </View>
    )
}