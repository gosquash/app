import { create } from "zustand";

import { fetchAPI } from "@/modules/api";
import type { Group } from "@/types/group";

interface GroupState {
	groups: Group[];

	fetchGroups: () => Promise<void>;
}

export const useGroups = create<GroupState>((set) => ({
	groups: [],

	fetchGroups: async () => {
		const data = await fetchAPI<{ groups: Group[] }>("/me/groups");

		if (data.error) {
			return;
		}

		set({ groups: data.groups ?? [] });
	},
}));
