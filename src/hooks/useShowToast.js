
import Toast from 'react-native-toast-message'

const useShowToast = () => {
    const showToast = ({ type, text1, text2 }) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2
        });
    };
    return showToast
}

export default useShowToast

