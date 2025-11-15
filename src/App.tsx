import { useEffect } from "react";
import "./App.css";
import { useUserActions, useUsers, type User } from "./store/useUserStore";

function App() {
  const users = useUsers();
  const { addList, add, remove } = useUserActions();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = (): void => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => addList(json));
  };

  const user: User = {
    id: 1111,
    email: "abc@gmail.com",
    name: "John Smith",
    phone: "123456",
    username: "john_smith_113",
  };

  return (
    <>
      <h1>My zustand app</h1>
      <button onClick={() => add(user)}>Add user</button>
      <button onClick={getUsers}>Refresh</button>
      {users.map((user) => (
        <div key={user.id} className="row">
          <p>
            {user.id} - {user.name} - {user.email} - {user.phone}
          </p>
          <button onClick={() => remove(user.id)}>Remove</button>
        </div>
      ))}
    </>
  );
}

export default App;
