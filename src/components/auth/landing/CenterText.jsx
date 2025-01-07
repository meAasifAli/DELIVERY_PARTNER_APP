import { Text, View } from 'react-native'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

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

export default CenterText

