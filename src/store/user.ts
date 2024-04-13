import { create } from "zustand";

import { fetchAPI } from "@/modules/api";
import type { User } from "@/types/user";

interface UserState {
	user: User | null;

	fetchUser(): Promise<User | null>;
}

export const useUser = create<UserState>((set) => ({
	user: null,

	fetchUser: async () => {
		const user = await fetchAPI<User>("/me");

		if (user.error) {
			return null;
		}

		set({ user });

		return user as User;
	},
}));
