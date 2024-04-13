import type { User } from "./user";

export interface Game {
	id: string;
	players: GamePlayer[];
}

interface GamePlayer {
	user: User;
	points: number;
}
