import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  // __v: '',
  theme: 'light',
  primary: '#3FC1C9',
  pink: '#FC5185',
  light: '#F9F9F9',
  dark: '#364F6B',
  dark700: '#524B6B',
  text: '#150B3D',
  title: '#0D0140',
  white: '#fff',
  yellow: '#FF9228',
  error: '#ff0d10',
  orange: '#ffe7cc',
};

export const profileSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      if (action.payload == 'Dark') {
        state = {
          theme: 'dark',
          primary: '#3FC1C9',
          pink: '#FC5185',
          light: '#364F6B',
          dark: '#F9F9F9',
          dark700: '#FFFFFF',
          text: '#F3F3F3',
          title: '#F6F6F6',
          white: '#364F6B',
          yellow: '#FF9228',
          error: '#ff0d10',
          orange: '#ffe7cc',
        };
      } else {
        state = initialState;
      }
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTheme} = profileSlice.actions;

export default profileSlice.reducer;
