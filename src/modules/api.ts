const API_URL = "http://10.0.0.149:1323";

type APIResponse<B> =
	| {
			error: true;
	  }
	| ({
			error: false;
	  } & B);

export async function fetchAPI<B = unknown>(
	url: string,
	options?: RequestInit,
): Promise<APIResponse<B>> {
	try {
		const response = await fetch(`${API_URL}${url}`, {
			...options,
			headers: {
				authorization:
					process.env.TEST_TOKEN ||
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguZ29zcXVhc2guZ2ciLCJzdWIiOiJmMTMwN2JmOS02ODI1LTRlZTktYjI3YS01MzI1NTIxNDMwNWUiLCJleHAiOjE3NDMxNzA0ODF9.ta5F7tQApBwBDE5UPqnVJz2IvMb3EmPj5Cc-nDw_NkU",
				...options?.headers,
			},
		});

		return response.json() as Promise<APIResponse<B>>;
	} catch (error) {
		console.error(error);
	}

	return { error: true };
}
