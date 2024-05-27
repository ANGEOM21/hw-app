import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./thunks";

const authAdapter = createEntityAdapter({
  selectId: (data: any) => data
});

const authSlice = createSlice({
  name: "auth",
  initialState: authAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        authAdapter.addOne(state, action.payload);
      })
			.addCase(logoutUser.fulfilled, (state, action) => {
				authAdapter.removeOne(state, action.payload);
			})
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  }
});

export const authActions = authAdapter.getSelectors((state: any) => state.auth);

export default authSlice.reducer;
