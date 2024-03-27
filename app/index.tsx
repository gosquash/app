import { useHookstate } from "@hookstate/core";

import Container from "@/components/container";
import Text from "@/components/text";

import { user } from "@/store";
import Header from "@/components/header";

export default function Home() {
	const state = useHookstate(user);

	const userState = state.get();

	return (
		<Container>
			<Header />

			<Text style={{ color: "white" }}>
				{userState?.id} {userState?.name}
			</Text>
		</Container>
	);
}
