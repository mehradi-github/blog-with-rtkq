import {
  configureStore,
  ThunkAction,
  Action,
  ConfigureStoreOptions,
  combineReducers,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import counterReducer from '../features/counter/counterSlice';
import { api } from './services/api';
import auth from '../features/auth/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// export const createStore = (
//   options?: ConfigureStoreOptions['preloadedState'] | undefined
// ) =>
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
  counter: counterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  // ...options,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
