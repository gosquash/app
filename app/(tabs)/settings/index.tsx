import { Link, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Container from "@/components/container";
import Header from "@/components/header";
import Text from "@/components/text";
import { useUser } from "@/store/user";
import { variables } from "@/utils/styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/pro-duotone-svg-icons";

const links = [
	{
		title: "General",
		type: "default",
		link: "/general",
	},
];

export default function ProfileSettings() {
	const user = useUser((state) => state.user),
		router = useRouter();

	return (
		<Container>
			<Header title={`@${user?.name}`} backButton />

			<View style={styles.links}>
				<Text as="h2">Settings</Text>

				{links.map((link) => (
					<TouchableOpacity
						key={link.title}
						style={styles.linkContainer}
						onPress={() => router.push(`/settings/${link.link}`)}
					>
						<FontAwesomeIcon icon={faGear} size={24} color={variables.accent} />
						<Text style={styles.linkText}>{link.title}</Text>
					</TouchableOpacity>
				))}
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	links: {
		gap: 8,
	},
	linkContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",

		paddingHorizontal: 16,
		height: 48,
		backgroundColor: variables.backgroundSecondary,
		borderRadius: 8,
		gap: 24,
		overflow: "hidden",
	},
	linkText: {
		fontSize: 18,
	},
});
