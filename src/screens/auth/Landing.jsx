import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const DeliveryLanding = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/pana.png")}
          style={{ height: height * 0.6, width: '100%', resizeMode: 'contain' }}
        />
      </View>
      <CenterText />
      <BottomContainer />
    </View>
  );
};

export default DeliveryLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.2,
    width: '100%',
    backgroundColor: '#202020',
    borderTopEndRadius: width * 0.15,
    borderTopStartRadius: width * 0.15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const CenterText = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          fontWeight: '400',
          fontFamily: 'OpenSans-Medium',
          color: 'black',
          textAlign: 'center',
          maxWidth: width * 0.8,
          marginHorizontal: 'auto',
        }}>
        Deliver Smiles Earn Big!
      </Text>
    </View>
  )
}


const BottomContainer = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('login')}
        style={{
          backgroundColor: '#FA4A0C',
          height: height * 0.075,
          width: '70%',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Medium',
            fontSize: 18,
            color: '#fff',
          }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  )
}
