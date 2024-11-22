import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Otp from './screens/Otp';
import PartnerOnboarding from './screens/PartnerOnboarding';
import PersonalInfo from './screens/PersonalInfo';
import PersonalDocs from './screens/PersonalDocs';
import VehicleDetails from './screens/VehicleDetails';
import BankAccountDetails from './screens/BankAccountDetails';
import WorkDetails from './screens/WorkDetails';
import UploadAdhar from './screens/UploadAdhar';
import UploadPAN from './screens/UploadPAN';
import UploadDrivingLicense from './screens/UploadDrivingLicense';
import RegistrationComplete from './screens/RegistrationComplete';
import Dashboard from './screens/Dashboard';
import { OrderProvider, useOrder } from './context/OrderContext';
import OrderRequest from './screens/OrderRequest';

const Stack = createNativeStackNavigator();
const App = () => {

  const isAuthenticated = !false

  return (
    <OrderProvider>
      <NavigationContainer>
        {isAuthenticated ? (
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
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="otp"
              component={Otp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="onboarding"
              component={PartnerOnboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="personal-info"
              component={PersonalInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="personal-docs"
              component={PersonalDocs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="vehicle-details"
              component={VehicleDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="bank-account-details"
              component={BankAccountDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="work-details"
              component={WorkDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="upload-adhar"
              component={UploadAdhar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="upload-pan"
              component={UploadPAN}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="upload-driving-license"
              component={UploadDrivingLicense}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="registration-complete"
              component={RegistrationComplete}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </OrderProvider>

  );
};

export default App;
