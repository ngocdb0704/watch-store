import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    role: 'admin' | 'user';
}

interface UserState {
    profile: UserProfile | null;
    isLoading: boolean;
}

const initialState: UserState = {
    profile: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        clearUser: (state) => {
            state.profile = null;
        },
    },
});

export const { setUser, setLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;