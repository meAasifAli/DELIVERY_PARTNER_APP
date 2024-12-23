import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
const { height, width } = Dimensions.get("window")
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setPhone } from '../../store/authSlice';

const Login = () => {
  const dispatch = useDispatch()
  const [mobile, setMobile] = useState("")
  const { handleAuthUser, loading } = useAuth()


  const handleAuth = async () => {
    if (!mobile) {
      alert("Please enter your mobile number")
      return
    }
    dispatch(setPhone(mobile))
    await handleAuthUser(mobile)
  }
  return (
    <KeyboardAvoidingView
      behavior={null}
      keyboardVerticalOffset={50}
      style={styles.container}>
      <View>
        <Image source={require("../../assets/images/pana.png")} style={{ height: height * 0.60, width: "100%", resizeMode: "contain" }} />
      </View>
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
                width: width * 0.90,
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
        <TouchableOpacity onPress={handleAuth} style={{ backgroundColor: "#FA4A0C", height: height * 0.075, width: "80%", borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center", marginTop: height * 0.035 }}>
          {
            loading ? <ActivityIndicator size={'small'} color={"#fff"} /> : <Text style={{
              fontFamily: "OpenSans-Medium",
              fontSize: 18,
              color: "#fff"
            }}>Continue</Text>
          }
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  bottomContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    height: "35%",
    width: "100%",
    backgroundColor: "#202020",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})
