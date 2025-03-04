import { OrderProvider } from './src/context/OrderContext';
import { Provider, } from 'react-redux';
import { store, persistor } from './src/store/store';
import AppNavigator from './src/config/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';




const App = () => {



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OrderProvider>
          <AppNavigator />
          <Toast />
        </OrderProvider>
      </PersistGate>
    </Provider>

  );
};

export default App;
