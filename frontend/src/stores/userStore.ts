import { defineStore } from 'pinia';
import type { User } from '@/types/user.interface';
import { getUsers } from '@/services/userService';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async fetchUsers() {
      const fetchedUsers = await getUsers();
      this.users = fetchedUsers;
    },
  },
  getters: {
    getUserById: (state) => (id: number) => {
      return state.users.find((user) => user.id === id);
    },
  },
});
