import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const { height, width } = Dimensions.get("window")

const BottomContainer = () => {
    const navigation = useNavigation()
    return (
        <View style={{
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
        }}>
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

export default BottomContainer