import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, TouchableOpacity } from "react-native";

import Button from "@/components/button";
import Container from "@/components/container";
import Header from "@/components/header";
import Text from "@/components/text";

import { useGroups } from "@/store/groups";
import { variables } from "@/utils/styles";

export default function Groups() {
	const [groups, fetchGroups] = useGroups((state) => [
		state.groups,
		state.fetchGroups,
	]);

	const [refreshing, setRefreshing] = useState(false),
		onRefresh = useCallback(() => {
			setRefreshing(true);
			refetchGroups();
		}, []);

	useEffect(() => {
		fetchGroups();
	}, []);

	async function refetchGroups() {
		await fetchGroups();

		setRefreshing(false);
	}

	return (
		<Container
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<Header title="Groups">
				<Button
					style={{
						width: 24,
						height: 24,
					}}
					href="groups/create"
				>
					<FontAwesomeIcon icon={faPlus} size={18} color="#000" />
				</Button>
			</Header>

			{groups.length === 0 ? (
				<Text style={{ color: variables.colorSecondary }}>
					There are no groups here.
				</Text>
			) : (
				groups.map((group) => (
					<Link href={`/groups/${group.id}`} asChild key={group.id}>
						<TouchableOpacity>
							<Text as="h3">{group.name}</Text>
						</TouchableOpacity>
					</Link>
				))
			)}
		</Container>
	);
}
