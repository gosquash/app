import { hookstate } from "@hookstate/core";
import { fetchAPI } from "../modules/api";

export interface User {
	id: number;
	name: string;
	email: string;
}

export const user = hookstate<User | null>(() => null);

export async function fetchUser(): Promise<boolean> {
	const data = await fetchAPI<User>("/me");

	if (data.error === true) {
		return false;
	}

	user.set(() => data);

	return true;
}

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
