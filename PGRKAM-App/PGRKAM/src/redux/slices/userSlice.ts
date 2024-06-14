import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  name: string | null;
  email: string | null;
  isGoogleLoggedIn: boolean | null;
  photoURL: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  isGoogleLoggedIn: false,
  photoURL: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGoogleLoginUser: (state, action) => {
      state = {...action.payload};
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setGoogleLoginUser} = userSlice.actions;

export default userSlice.reducer;
