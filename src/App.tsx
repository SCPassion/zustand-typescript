import { useState } from "react";
import { useUserStore, usePostStore } from "./store";

// Updating the username & email in the store from a child compoent, input fields. Will change the state in the store
// and the state in the parent component will also be updated automatically
// This is because Zustand uses a single source of truth for the state, which is the store itself.
function UpdateUserForm() {
  const { username, email, setUsername, setEmail } = useUserStore(); // This will access the store

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}
function App() {
  const { username, email, setUsername, setEmail } = useUserStore(); // THis create a single source of store, which will be used in the entire app
  const { posts, setPosts, addPost, removePost } = usePostStore(); // This will create a single source of store for posts

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postIdCounter, setPostIdCounter] = useState(1); // This is a local state, which is not shared with the store

  return (
    <>
      <h1>Welcome to React + TypeScript + Vite</h1>
      <h2>Username: {username}</h2>
      <h2>Email: {email}</h2>
      <UpdateUserForm />

      <div>
        <b>Create new post</b>
      </div>
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Post title"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={() => {
          addPost({ id: postIdCounter.toString(), title, content });
          setPostIdCounter((prev) => prev + 1); // Increment the postIdCounter to create a new id for the next post
          setTitle(""); // Clear the input field
          setContent(""); // Clear the input field
        }}
      >
        Add Post
      </button>

      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => removePost(post.id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
