import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	Image,
	RefreshControl,
	StyleSheet,
	TouchableHighlight,
	View,
} from "react-native";

import Container from "@/components/container";
import Text from "@/components/text";

import { useGames } from "@/store/game";
import { variables } from "@/utils/styles";

export default function Games() {
	const [games, fetchGames] = useGames((state) => [
		state.games,
		state.fetchGames,
	]);

	const [refreshing, setRefreshing] = useState(false),
		onRefresh = useCallback(() => {
			setRefreshing(true);
			refetchGames();
		}, []);

	useEffect(() => {
		if (games.length === 0) {
			fetchGames();
		}
	}, []);

	async function refetchGames() {
		await fetchGames();

		setRefreshing(false);
	}

	return (
		<Container
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<Text as="h2">Your games</Text>

			<View>
				{games.map((game) => (
					<TouchableHighlight key={game.id} style={{ marginBottom: 16 }}>
						<Link href={`/games/${game.id}`} style={styles.game}>
							<Text bold style={styles.score}>
								{game.players[0].points}
							</Text>
							<Image
								style={styles.avatar}
								source={{
									uri: `https://api.multiavatar.com/${game.players[0].user.name}.png`,
								}}
							/>

							<Text bold style={{ color: variables.colorSecondary }}>
								vs
							</Text>

							<Image
								style={styles.avatar}
								source={{
									uri: `https://api.multiavatar.com/${game.players[1].user.name}.png`,
								}}
							/>
							<Text bold style={styles.score}>
								{game.players[1].points}
							</Text>
						</Link>
					</TouchableHighlight>
				))}
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	game: {
		width: "100%",
		backgroundColor: variables.backgroundSecondary,
		borderRadius: 8,
		height: 56,
		paddingHorizontal: 24,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	score: {
		fontSize: 24,
	},
	avatar: {
		height: 32,
		width: 32,
		borderWidth: 1,
		borderColor: "#FFF",
		borderRadius: 32,
	},
});
