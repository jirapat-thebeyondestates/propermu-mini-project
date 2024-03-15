'use client';
/**
 * ref : https://redux-toolkit.js.org/tutorials/quick-start
 */


import {configureStore} from "@reduxjs/toolkit";
import currentLocationSlice from "@/app/redux/feat/get_current_location";

export const store = configureStore({
    reducer: {
        currentLocation: currentLocationSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch