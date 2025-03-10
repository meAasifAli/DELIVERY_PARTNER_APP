import { useNavigation } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDocs } from '../../store/docSlice'




const PartnerOnboarding = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { pendingDocs, completedDocs } = useSelector(state => state.doc)

    useEffect(() => {
        dispatch(getDocs({ token }))
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            {
                pendingDocs.length === 0 && <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 10, marginTop: 20 }}>
                    <Text style={{ color: "#000", fontFamily: "OpenSans-Regular", textAlign: "center", fontSize: 12 }}>Dear Delivery partner you have Uploaded All Documents for the process, please wait for Next 24 hours for the Document Approval</Text>
                </View>
            }
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    pendingDocs?.length > 0 && <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                        <View>
                            <Text style={{ color: "#000", fontFamily: "OpenSans-Medium", fontSize: 20, lineHeight: 27 }}>Pending Docs</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {
                                pendingDocs?.map((item, id) => {
                                    return <PendingDoc key={id} title={item} href={item} />
                                })
                            }
                            {
                                pendingDocs?.length === 0 && <Text style={{ fontFamily: "OpenSans-Regular", textAlign: "center", marginTop: 20 }}>No Pending Doc</Text>
                            }
                        </View>
                    </View>
                }
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

            </ScrollView>
        </View>
    )
}

export default PartnerOnboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const Header = () => {
    return (
        <View style={{ width: "100%", backgroundColor: "#202020", elevation: 5, borderBottomStartRadius: 25, borderBottomEndRadius: 25, padding: "7%" }}>
            <View>
                <Text style={{ color: "white", fontSize: 20, fontFamily: "OpenSans-Bold", textAlign: "center" }}>Welcome to Food kart</Text>
            </View>
            <View style={{ marginTop: "7%", maxWidth: "80%", marginHorizontal: "auto" }}>
                <Text style={{ color: "white", fontSize: 12, fontFamily: "OpenSans-Regular", textAlign: "center" }}>Just a few more steps will help you finish creating
                    your profile and begin making money.</Text>
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

const CompletedDoc = ({ title, href }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate(href)} style={{ backgroundColor: "#fff", padding: 10, borderColor: "#D6D6D6", borderWidth: 0.5, display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 10, minHeight: 50, marginVertical: 5 }}>
            <View>
                <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 15, color: "#60B246" }}>{title}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <MaterialIcons name='done' size={25} color={"#60B246"} />
            </View>
        </TouchableOpacity>
    )
}