import { useUserStore } from "./store";

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

  return (
    <>
      <h1>Welcome to React + TypeScript + Vite</h1>
      <h2>Username: {username}</h2>
      <h2>Email: {email}</h2>
      <UpdateUserForm />
    </>
  );
}

export default App;
