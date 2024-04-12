import { create } from "zustand";

import { fetchAPI } from "@/modules/api";

export interface User {
	id: number;
	name: string;
	email: string;
}

interface UserState {
	user: User | null;
	login: (user: User) => void;
}

export const useUser = create<UserState>((set) => ({
	user: null,
	login: (user) => set((state) => ({ user })),
}));

export async function fetchUser(): Promise<User | false> {
	const data = await fetchAPI<User>("/me");

	if (data.error === true) {
		return false;
	}

	return data;
}
