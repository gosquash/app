import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type APIResponse<R> =
	| {
			error: true;
			data: R;
	  }
	| ({
			error: false;
	  } & R);

export interface APIRequestOptions<B extends BodyInit> extends RequestInit {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: B | undefined;
	headers?: Record<string, string>;
}

export async function fetchAPI<R = unknown, B extends BodyInit = BodyInit>(
	url: string,
	options?: APIRequestOptions<B>,
): Promise<APIResponse<R>> {
	try {
		const token = await AsyncStorage.getItem("token");

		const response = await fetch(`${API_URL}${url}`, {
			...options,
			headers: {
				authorization: `Bearer ${token}`,
				...options?.headers,
			},
		});

		// check if response has body
		if (!response.ok) {
			return { error: true, data: null as any };
		}

		if (response.status === 204) {
			return { error: false };
		}

		const data: APIResponse<R> = await response.json();

		if (data.error) {
			console.log(data);
			return { error: true, data: data.data };
		}

		return data;
	} catch (error) {
		console.error(error);
	}

	return { error: true, data: null as any };
}
