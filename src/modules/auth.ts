interface AuthState {
	user: null | User;
	loading: boolean;
	handler: () => Promise<void>;
}

export function createStore<F = any>(handler: () => Promise<void>) {
	const store = create<AuthState>((set) => ({
		user: null,
		loading: false,
		handler,
	}));
}
