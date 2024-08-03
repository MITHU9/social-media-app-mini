/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter((post) => post.id !== action.payload);
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }

  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (newPost) => {
    //console.log(newPost);
    dispatchPostList({ type: "ADD_POST", payload: newPost });
  };

  const deletePost = (id) => {
    //console.log("delete");
    dispatchPostList({ type: "DELETE_POST", payload: id });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: 1,
    title: "First Post",
    content: "This is the first post",
    reaction: 5,
    userId: "user-9",
    tags: ["vacation", "Dhaka", "Enjoy"],
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the Second post",
    reaction: 10,
    userId: "user-10",
    tags: ["vacation", "USA", "Enjoy"],
  },
];
export default PostListProvider;
