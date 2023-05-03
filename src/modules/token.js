import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    token: (state = initialState, action) => {
      state.token = action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { token } = tokenSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default tokenSlice.reducer;
