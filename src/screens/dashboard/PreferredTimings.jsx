import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import RadioButton from 'react-native-radio-button'
import { useState } from 'react'
import useUploadWorkPreference from '../../hooks/useUploadWorkPreference'

const PreferredTimings = () => {
    const [workPref, setWorkPref] = useState("full_time")
    const { handleUploadWorkPreference } = useUploadWorkPreference()

    const handleupload = async () => {
        await handleUploadWorkPreference(workPref)
    }

    return (
        <View style={styles.container}>
            <Header />
            <View>
                <Text
                    style={{
                        fontFamily: "OpenSans-Regular",
                        maxWidth: "75%",
                        marginHorizontal: "auto",
                        marginVertical: "3%",
                        textAlign: "center",
                        fontSize: 14,
                        lineHeight: 21,
                        letterSpacing: 0.05
                    }}
                >
                    Your Selection will be valid for 30 days. You
                    can change your preferences after that.
                </Text>
            </View>
            <View style={{ marginTop: "10%" }}>
                <TimingCard
                    heading={"full_time"}
                    secondaryHeading={"6 days a week"}
                    workPref={workPref}
                    setWorkPref={setWorkPref}
                />
                <TimingCard
                    heading={"part_time"}
                    secondaryHeading={"6 days a week"}
                    workPref={workPref}
                    setWorkPref={setWorkPref}
                />
                <TimingCard
                    heading={"weekends"}
                    secondaryHeading={"Fri, Sat, Sun."}
                    workPref={workPref}
                    setWorkPref={setWorkPref}
                />
            </View>
            <TouchableOpacity onPress={handleupload} style={{ marginTop: "15%", width: "90%", height: 64, marginHorizontal: "auto", backgroundColor: "#FA4A0C", padding: 10, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff", fontSize: 24, fontFamily: "OpenSans-Regular" }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PreferredTimings

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
                <Text style={{ color: "#fff", fontSize: 18, fontFamily: "OpenSans-Bold", textAlign: "center" }}>Select Your  Work Timings</Text>
            </View>
        </View>
    )
}


const TimingCard = ({ heading, secondaryHeading, workPref, setWorkPref }) => {

    return (
        <View style={{
            backgroundColor: "#fff",
            elevation: 1,
            width: "90%",
            marginHorizontal: "auto",
            padding: "5%",
            borderRadius: 10,
            marginVertical: "3%",
            borderColor: "#6D6D6D80",
            borderWidth: 1
        }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <View>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={heading === workPref}
                        onPress={() => setWorkPref(heading)}
                        size={8}
                        innerColor={heading === workPref ? "#FA4A0C" : "#fff"}
                        outerColor={"#000"}
                    />
                </View>
                <View>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: "OpenSans-Bold",
                        marginLeft: 10,
                        lineHeight: 19,
                        textTransform: "capitalize"
                    }}>
                        {heading}
                    </Text>
                </View>
            </View>

        </View>
    )
}