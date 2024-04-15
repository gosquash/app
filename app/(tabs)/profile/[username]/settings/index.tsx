import { faGear, faLock } from "@fortawesome/pro-duotone-svg-icons";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import Constants from "expo-constants";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Container from "@/components/container";
import Header from "@/components/header";
import Text from "@/components/text";

import { useUser } from "@/store/user";

import { variables } from "@/utils/styles";
import Divider from "@/components/divider";

const links = [
	{
		title: "General",
		icon: faGear,
		link: "./general",
	},
	{
		title: "Security & Privacy",
		icon: faLock,
		link: "./security-privacy",
	},
	{
		title: "General",
		icon: faGear,
		link: "./general2",
	},
];

export default function ProfileSettings() {
	const user = useUser((state) => state.user);

	return (
		<Container>
			<Header title={`@${user?.name}`} backButton />

			<View style={styles.links}>
				{links.map(({ link, title, icon }) => (
					<Link href={link} asChild key={link}>
						<TouchableOpacity style={styles.linkContainer}>
							<View
								style={{ flexDirection: "row", alignItems: "center", gap: 18 }}
							>
								<FontAwesomeIcon
									icon={icon}
									size={24}
									color={variables.colorSecondary}
								/>
								<Text bold style={styles.linkText}>
									{title}
								</Text>
							</View>

							<FontAwesomeIcon
								icon={faChevronRight}
								size={16}
								color={variables.colorSecondary}
							/>
						</TouchableOpacity>
					</Link>
				))}
			</View>

			<Divider />

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Text bold>App Version</Text>

				<Text style={{ letterSpacing: 1.2, color: variables.colorSecondary }}>
					v{Constants.expoConfig?.version}
				</Text>
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

		height: 48,
		borderRadius: 8,
		gap: 24,
		overflow: "hidden",
		justifyContent: "space-between",
	},
	linkText: {
		color: variables.color,
		fontSize: 16,
	},
});
