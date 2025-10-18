import { createSlice, configureStore } from "@reduxjs/toolkit";

// --- Create Auth Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: null },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      
    },
    logout(state) {
      state.isLoggedIn = false;
    
    },
  },
}); 

// --- Export Actions ---
export const authActions = authSlice.actions;

// --- Create and Export Store ---
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // you can add more slices later
  },
});
