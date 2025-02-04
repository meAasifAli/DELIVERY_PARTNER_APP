import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

const ConfirmOrder = ({ isOpen, setIsOpen }) => {
    return (
        <Modal
            isVisible={isOpen}
            onBackdropPress={() => setIsOpen(false)}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            animationIn="fadeInUp"
            animationInTiming={1000}
            animationOut={"fadeOutDown"}
            animationOutTiming={1000}
        >
            <View style={{
                backgroundColor: "#fff",
                borderRadius: 15,
                padding: "5%",
                width: "100%",
                marginHorizontal: "auto",
                justifyContent: "center",
                alignItems: "center"

            }}>
                <Text style={{ fontFamily: "OpenSans-Bold", color: "#000", fontSize: 18, textAlign: "center" }}>Confirm Order</Text>
                <Text style={{ fontFamily: "OpenSans-Regular", color: "#000", fontSize: 16, textAlign: "center" }}>Are you sure you want to confirm this order?</Text>
                <TouchableOpacity style={{
                    backgroundColor: "#FA4A0C",
                    borderRadius: 15,
                    padding: "5%",
                    width: "100%",
                    marginHorizontal: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20

                }}>
                    <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: 16, textAlign: "center" }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsOpen(false)} style={{
                    backgroundColor: "#000",
                    borderRadius: 15,
                    padding: "5%",
                    width: "100%",
                    marginHorizontal: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10

                }}>
                    <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: 16, textAlign: "center" }}>No</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ConfirmOrder

