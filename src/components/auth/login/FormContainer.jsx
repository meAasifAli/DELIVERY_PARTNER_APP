import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const { height, width } = Dimensions.get("window")

const FormContainer = ({ mobile, setMobile, loading, handleAuth }) => {
    return (
        <View
            style={styles.bottomContainer}>
            <View
            >
                <View>
                    <Text style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: 12,
                        color: "#fff"
                    }}>Mobile</Text>
                </View>
                <View
                >
                    <TextInput
                        value={mobile}
                        onChangeText={(text) => setMobile(text)}
                        keyboardType='numeric'
                        placeholderTextColor={"white"}
                        style={{
                            width: width * 0.85,
                            marginHorizontal: "auto",
                            height: height * 0.075,
                            borderColor: "#fff",
                            borderWidth: 2,
                            borderRadius: 15,
                            paddingHorizontal: 10,
                            marginTop: 10,
                            fontSize: 16,
                            fontFamily: "OpenSans-Regular",
                            color: "#fff"
                        }}
                        placeholder='Enter your mobile number' />
                </View>
            </View>
            <TouchableOpacity onPress={handleAuth} style={{ backgroundColor: "#FA4A0C", height: height * 0.065, width: "80%", borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center", marginTop: height * 0.035 }}>
                {
                    loading ? <ActivityIndicator size={'small'} color={"#fff"} /> : <Text style={{
                        fontFamily: "OpenSans-Medium",
                        fontSize: 18,
                        color: "#fff"
                    }}>Continue</Text>
                }
            </TouchableOpacity>
        </View>

    )
}

export default FormContainer

const styles = StyleSheet.create({
    bottomContainer: {
        position: "absolute",
        bottom: 0,
        height: "40%",
        width: "100%",
        backgroundColor: "#202020",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})