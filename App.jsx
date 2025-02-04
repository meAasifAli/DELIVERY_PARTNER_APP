import { OrderProvider } from './src/context/OrderContext';
import { Provider, } from 'react-redux';
import { store, persistor } from './src/store/store';
import AppNavigator from './src/config/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';




const App = () => {



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OrderProvider>
          <AppNavigator />
        </OrderProvider>
      </PersistGate>
    </Provider>

  );
};

export default App;
