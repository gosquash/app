import Container from "@/components/container";
import Header from "@/components/header";
import Text from "@/components/text";

import { useUser } from "@/store/user";

export default function Home() {
	const user = useUser();

	return (
		<Container>
			<Header />

			<Text as="h2">Hey there!</Text>
		</Container>
	);
}
