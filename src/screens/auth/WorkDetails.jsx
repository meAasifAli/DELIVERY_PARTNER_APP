import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PreferredTimings from "../dashboard/PreferredTimings"
import WorkArea from "../dashboard/WorkArea"
import OrderDeliveryType from "../dashboard/OrderDeliveryType"


const WorkStack = createNativeStackNavigator()

const WorkDetails = () => {
    return (
        <WorkStack.Navigator
            initialRouteName="preferred-timings"
        >
            <WorkStack.Screen name="preferred-timings" component={PreferredTimings} options={{ headerShown: false }} />
            <WorkStack.Screen name="work-area" component={WorkArea} options={{ headerShown: false }} />
            <WorkStack.Screen name="order-delivery-type" component={OrderDeliveryType} options={{ headerShown: false }} />
        </WorkStack.Navigator>
    )
}

export default WorkDetails

