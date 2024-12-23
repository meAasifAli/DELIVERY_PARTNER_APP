import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Dashboard from "../screens/dashboard/Dashboard"
import OrderRequest from "../screens/dashboard/OrderRequest"

const Stack = createNativeStackNavigator()

const AuthenticatedUserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="order-request"
                component={OrderRequest}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AuthenticatedUserStack
