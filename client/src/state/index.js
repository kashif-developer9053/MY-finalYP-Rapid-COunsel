import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  lawyer: null, // New state for lawyer
  token: null,
  posts: [],
  comments: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLawyerLogin: (state, action) => {
      state.lawyer = action.payload.lawyer;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.lawyer = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else if (state.lawyer) {
        state.lawyer.friends = action.payload.friends;
      } else {
        console.error("User or lawyer friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setLawyers: (state, action) => {
      state.lawyers = action.payload; // Set lawyers state with payload
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPostComments: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.postId
      );
      if (postIndex !== -1) {
        state.posts[postIndex].comments = action.payload.comments;
      }
      state.comments = action.payload.comments;
    },
  },
});

export const {
  setMode,
  setUserLogin,
  setLawyerLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setPostComments,
} = authSlice.actions;
export default authSlice.reducer;
