import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.172:1323";

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

		const data: APIResponse<R> = await response.json();

		if (data.error) {
			return { error: true, data: data.data };
		}

		return data;
	} catch (error) {
		console.error(error);
	}

	return { error: true, data: null as any };
}
