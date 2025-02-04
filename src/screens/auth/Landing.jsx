import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
const { height } = Dimensions.get('window');
import CenterText from '../../components/auth/landing/CenterText';
import BottomContainer from '../../components/auth/landing/BottomContainer';


const DeliveryLanding = () => {


  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/pana.png")}
          style={{ height: height * 0.50, width: '100%', resizeMode: 'contain' }}
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
});




