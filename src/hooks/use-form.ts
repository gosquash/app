import { create } from "zustand";

type Fields = Record<string, any>;

interface Store<F extends Fields = Fields> {
	fields: F;

	loading: boolean;
	error: string;

	setLoading: (loading: boolean) => void;
	setError: (error: string) => void;
	setFields: (fields: Partial<F>) => void;
	submit: (values: F) => Promise<void>;
}

interface UseFormProps<F extends Fields = Fields> {
	fields: F;
	submit: (values: F) => Promise<void>;
}

export default function useForm<F extends Fields>({
	fields,
	submit,
}: UseFormProps<F>) {
	const store = create<Store<F>>((set) => ({
		fields,
		loading: false,
		error: "",

		setLoading: (loading) => set(() => ({ loading })),
		setError: (error) => set(() => ({ error })),
		setFields: (fields) =>
			set((state) => ({ fields: { ...state.fields, ...fields } })),
		submit: async () => {
			set({ loading: true });

			try {
				await submit(fields);
			} catch (error) {
				console.log(error);
			} finally {
				set({ loading: false });
			}
		},
	}));

	return store;
}
