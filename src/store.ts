import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type UserStore = {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
};

// create a store to manage the user state, itself is a hook
export const useUserStore = create(
  devtools<UserStore>(
    (set) => ({
      // set function is used to update the state in the store immutably
      // initial state
      username: "",
      email: "",

      // function to update the state
      setUsername: (username: string) =>
        set(() => ({
          // return the new state
          username,
          // We only need to update the username without spreading the rest of the state.
          // Why? Zustand will merge the new state with the old state automatically.
        })),

      setEmail: (email: string) =>
        set(() => ({
          email,
        })),
      //
    }),
    { name: "user", store: "user" }
  )
);

export type Post = {
  id: string;
  title: string;
  content: string;
};

export type PostsStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  removePost: (id: string) => void;
};

export const usePostStore = create(
  devtools<PostsStore>(
    (set) => ({
      posts: [], // initial state
      // setPosts function to update the posts state
      setPosts: (posts: Post[]) => set(() => ({ posts: posts })), // no reference to the previous state, so we can just return the new state

      addPost: (post: Post) =>
        // addPost function to add a new post to the posts state
        set((state) => ({ posts: [...state.posts, post] })), // immutably update the state by spreading the previous state and adding the new post

      removePost: (id: string) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    { name: "posts", store: "posts" }
  )
);
