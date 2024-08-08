/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter((post) => post.id !== action.payload);
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }

  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (newPost) => {
    //console.log(newPost);
    dispatchPostList({ type: "ADD_POST", payload: newPost });
  };
  const addInitialPosts = (posts) => {
    //console.log(posts);
    dispatchPostList({ type: "ADD_INITIAL_POSTS", payload: { posts } });
  };

  const deletePost = (id) => {
    //console.log("delete");
    dispatchPostList({ type: "DELETE_POST", payload: id });
  };

  return (
    <PostList.Provider
      value={{ postList, addPost, addInitialPosts, deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
