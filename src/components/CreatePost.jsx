import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userId = useRef();
  const postTitle = useRef();
  const postContent = useRef();
  const reactions = useRef();
  const tags = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle.current.value,
        body: postContent.current.value,
        reactions: {
          likes: parseInt(reactions.current.value),
        },
        userId: userId.current.value,
        tags: tags.current.value.split(" ").map((tag) => tag.trim()),
      }),
    })
      .then((res) => res.json())
      .then((post) => addPost(post));

    postTitle.current.value = "";
    postContent.current.value = "";
    reactions.current.value = "";
    userId.current.value = "";
    tags.current.value = "";
  };
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Your Id
        </label>
        <input
          type="text"
          ref={userId}
          className="form-control"
          id="userId"
          placeholder="Enter your user id here..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitle}
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postContent}
          rows="5"
          className="form-control"
          id="content"
          placeholder="Tell us more about it..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          ref={reactions}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted this post..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Your Hashtags
        </label>
        <input
          type="text"
          ref={tags}
          className="form-control"
          id="tags"
          placeholder="Enter your hashtags using space..."
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
