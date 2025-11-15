import { act, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { User, useUserStore } from "./store/useUserStore";

const user: User = {
  id: 1111,
  email: "abc@gmail.com",
  name: "John Smith",
  phone: "123456",
  username: "john_smith_113",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([user]),
  })
) as jest.Mock;

beforeEach(() => {
  act(() => {
    useUserStore.setState({ users: [], userCount: 0 });
    // useUserStore.getState().actions.addList([]);
  });
});

test("fetch data", async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => res.json()
  );
  expect(data[0].name).toBe(user.name);
});

test("render hompage", async () => {
  act(() => {
    render(<App />);
    useUserStore.getState().actions.addList([user]);
  });
  await waitFor(() =>
    expect(screen.getByText("My zustand app")).toBeInTheDocument()
  );
});
