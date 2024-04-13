import { fetchAPI } from "@/modules/api";
import type { Game } from "@/types/game";
import { create } from "zustand";

interface GameState {
	games: Game[];

	fetchGames: () => Promise<void>;
}

export const useGames = create<GameState>((set) => ({
	games: [],

	fetchGames: async () => {
		const data = await fetchAPI<{ games: Game[] }>("/games");

		if (data.error) {
			return;
		}

		set({ games: data.games ?? [] });
	},
}));
