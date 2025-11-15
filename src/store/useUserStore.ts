import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

type Actions = {
  remove: (userId: User["id"]) => void;
  add: (user: User) => void;
  update: (userId: User["id"], user: User) => void;
  addList: (users: User[]) => void;
};

type State = {
  userCount: number;
  users: User[];
  actions: Actions;
};

export const useUserStore = create<State>((set) => ({
  userCount: 10,
  users: [],
  actions: {
    remove: (userId): void =>
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
        userCount: state.userCount++,
      })),
    add: (user: User): void =>
      set((state) => ({
        users: [...state.users, user],
        userCount: state.userCount++,
      })),
    update: (userId: User["id"], user: User): void =>
      set((state) => ({
        users: state.users.map((item) => {
          if (item.id === userId) {
            item.email = user.email;
            item.name = user.name;
            item.phone = user.phone;
            item.username = user.username;
          }
          return item;
        }),
      })),
    addList: (users: User[]): void =>
      set(() => ({
        userCount: users.length,
        users: users,
      })),
  },
}));

export const useUserCount = () => useUserStore((state) => state.userCount);

export const useUsers = () => useUserStore((state) => state.users);

export const useUserActions = () => useUserStore((state) => state.actions);
