import { useEffect } from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import Container from "@/components/container";
import Text from "@/components/text";
import Header from "@/components/header";

import { useGroups } from "@/store/groups";
import Button from "@/components/button";

export default function Groups() {
	const [groups, fetchGroups] = useGroups((state) => [
		state.groups,
		state.fetchGroups,
	]);

	const router = useRouter();

	useEffect(() => {
		fetchGroups();
	}, []);

	return (
		<Container>
			<Header title="Groups">
				<Button
					style={{ height: "auto", paddingHorizontal: 16, paddingVertical: 8 }}
					textStyle={{ fontSize: 14 }}
					onPress={() => router.push("/groups/create")}
				>
					Add
				</Button>
			</Header>

			{groups.length === 0 ? (
				<Text>There are no groups here.</Text>
			) : (
				groups.map((group) => (
					<TouchableOpacity
						key={group.id}
						onPress={() => router.push(`/groups/${group.id}`)}
					>
						<Text as="h3">{group.name}</Text>
					</TouchableOpacity>
				))
			)}
		</Container>
	);
}
