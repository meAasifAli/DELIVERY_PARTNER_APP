import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import docReducer from './docSlice'
import locationReducer from './locationSlice'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        doc: docReducer,
        location: locationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"]
        }
    })
})

const persistor = persistStore(store)
export { store, persistor }