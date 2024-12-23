import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getDocs } from '../../store/docSlice'
import useApproveDocs from '../../hooks/useApproveDocs'

const RegistrationComplete = () => {
    const { handleAuthUser } = useApproveDocs()
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state?.auth)
    const { completedDocs } = useSelector((state) => state?.doc)

    useEffect(() => {
        dispatch(getDocs({ token }))
    }, [])


    const handleAuth = async () => {
        await handleAuthUser()
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={{ backgroundColor: "#FA4A0C", padding: "5%", zIndex: 0, width: "100%", height: "30%", marginTop: "10%" }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "10%"
                }}>
                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%"
                    }}>
                        <Text style={{
                            maxWidth: "70%",
                            fontFamily: "OpenSans-Regular",
                            color: "white",
                            fontSize: 16,
                            lineHeight: 21
                        }}>
                            Your application is under
                            Verification.
                        </Text>
                        <Text style={{
                            maxWidth: "80%",
                            fontFamily: "OpenSans-Regular",
                            color: "white",
                            fontSize: 16,
                            lineHeight: 21
                        }}>
                            Activation of account may take
                            upto 24hrs.
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{ height: 120, width: 100, resizeMode: "contain" }}
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/512/2573/2573990.png"
                            }} />
                    </View>
                </View>
            </View>
            <ScrollView style={{ marginTop: "10%" }}>
                <View style={{ paddingHorizontal: 10, }}>
                    <View>
                        <Text style={{ color: "#000", fontFamily: "OpenSans-Medium", fontSize: 20, lineHeight: 27 }}>Completed Docs</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        {
                            completedDocs?.map((item, id) => {
                                return <CompletedDoc key={id} title={item} href={item} />
                            })
                        }
                    </View>
                </View>
                <TouchableOpacity onPress={handleAuth} style={{ marginVertical: "10%", backgroundColor: "#FA4A0C", borderRadius: 10, height: 50, display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginHorizontal: "auto" }}>
                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Medium", textAlign: "center", }}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default RegistrationComplete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative"
    }
})

const Header = () => {
    return (
        <View style={{ position: "absolute", top: 0, backgroundColor: "#202020", borderBottomStartRadius: 25, borderBottomEndRadius: 25, padding: "7%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10, zIndex: 1, width: "100%" }}>
            <View style={{ marginHorizontal: "auto" }}>
                <Text style={{ color: "#fff", fontSize: 16, fontFamily: "OpenSans-Bold", }}>Registration Complete</Text>
            </View>
        </View>
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