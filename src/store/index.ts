import { hookstate } from "@hookstate/core";
import { fetchAPI } from "../modules/api";

import type { User } from "./user";

interface Game {
	id: number;
	name: string;
	players: {
		user: User;
		points: number;
	}[];
}

export const games = hookstate<Game[]>([]);

export async function fetchGames() {
	const data = await fetchAPI<{ games: Game[] }>("/games");

	if (data.error === true) {
		return;
	}

	games.set(data.games ?? []);
}
