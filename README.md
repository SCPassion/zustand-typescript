# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# Zustand Learning Project

This project is a learning exercise to understand and implement state management using Zustand in a React + TypeScript application. Below is a summary of key concepts and examples for future reference.

## Key Concepts

### 1. **Creating a Zustand Store**

Zustand allows you to create a global store to manage application state. Here's an example of a simple user store:

```typescript
import { create } from "zustand";

export type UserStore = {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  email: "",
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
}));
```

### 2. **Accessing the Store in Components**

You can use the store in any component by calling the custom hook:

```tsx
import { useUserStore } from "./store";

function UpdateUserForm() {
  const { username, email, setUsername, setEmail } = useUserStore();

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
```

### 3. **Adding Multiple States and Actions**

You can add as many states and actions as needed in a single store:

```typescript
export const useAppStore = create((set) => ({
  username: "",
  email: "",
  theme: "light",
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
```

### 4. **Using Selectors for Efficiency**

To optimize performance, you can use selectors to subscribe to specific parts of the state:

```tsx
const username = useUserStore((state) => state.username);
const setUsername = useUserStore((state) => state.setUsername);
```

### 5. **Middleware**

Zustand supports middleware like `devtools` for debugging:

```typescript
import { devtools } from "zustand/middleware";

export const useUserStore = create(
  devtools((set) => ({
    username: "",
    email: "",
    setUsername: (username) => set({ username }),
    setEmail: (email) => set({ email }),
  }))
);
```

## Summary

- Zustand is a lightweight and flexible state management library.
- You can create a single store or multiple stores depending on your app's needs.
- Optimize performance with selectors and middleware like `devtools`.

This project serves as a reference for implementing Zustand in future projects.
