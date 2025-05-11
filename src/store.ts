import { create } from "zustand";

export type UserStore = {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
};

// store the single source of truth for the app
// create a store to manage the user state, itself is a hook
export const useUserStore = create<UserStore>((set) => ({
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
}));
