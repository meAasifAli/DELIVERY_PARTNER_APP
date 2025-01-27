import { Dimensions, Image, StyleSheet, View } from 'react-native'
const { height } = Dimensions.get("window")
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setPhone } from '../../store/authSlice';
import FormContainer from '../../components/auth/login/FormContainer';



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
    <View
      style={styles.container}>
      <View>
        <Image source={require("../../assets/images/pana.png")} style={{ height: height * 0.55, width: "100%", resizeMode: "contain" }} />
      </View>
      <FormContainer loading={loading} handleAuth={handleAuth} mobile={mobile} setMobile={setMobile} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})
