import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
const { height } = Dimensions.get('window');
import CenterText from '../../components/auth/landing/CenterText';
import BottomContainer from '../../components/auth/landing/BottomContainer';
import { useSelector } from 'react-redux';

const DeliveryLanding = () => {
  const { startLocation } = useSelector((state) => state?.location)

  console.log(startLocation);

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
});




