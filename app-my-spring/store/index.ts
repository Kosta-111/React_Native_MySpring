import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountApi } from '@/services/accountService';
import { categoriesApi } from "@/services/categoriesService";
import authReducer from '@/store/slices/userSlice';
import {dishesApi} from "@/services/dishesService";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [dishesApi.reducerPath]: dishesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(  // Додаємо API middleware
            accountApi.middleware,
            categoriesApi.middleware,
            dishesApi.middleware
        )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector