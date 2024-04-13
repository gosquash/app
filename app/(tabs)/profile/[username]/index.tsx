import {
	faBan,
	faGear,
	faUserCheck,
	faUserPlus,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import Button from "@/components/button";
import Container from "@/components/container";
import Text from "@/components/text";

import { useUser } from "@/store/user";
import { variables } from "@/utils/styles";

export default function Profile() {
	const user = useUser((state) => state.user);

	const [friends, setFriends] = useState(false);

	return (
		<Container style={{ gap: 32 }}>
			<View style={styles.banner}>
				<Image
					src={`https://api.multiavatar.com/${user?.name}.png`}
					style={styles.avatar}
				/>

				<View style={styles.bannerInfo}>
					<Text bold style={styles.text}>
						@{user?.name}
					</Text>
					<Text>QR</Text>
				</View>

				<Link
					href={{
						pathname: "profile/[username]/settings",
						params: { username: user?.name },
					}}
					asChild
				>
					<TouchableOpacity style={styles.settings}>
						<FontAwesomeIcon
							icon={faGear}
							size={24}
							color={variables.colorSecondary}
						/>
					</TouchableOpacity>
				</Link>
			</View>

			<View
				style={{
					flex: 1,
					flexDirection: "row",
					gap: 16,
					height: 38,
				}}
			>
				<Button onPress={() => setFriends((prev) => !prev)}>
					<FontAwesomeIcon
						icon={friends ? faUserCheck : faUserPlus}
						size={24}
					/>
				</Button>
				<Button variant="danger">
					<FontAwesomeIcon icon={faBan} size={24} />
				</Button>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	banner: {
		height: 200,
		backgroundColor: variables.backgroundSecondary,
		borderBottomColor: variables.borderColor,
		borderBottomWidth: 1,
		marginHorizontal: -32,

		alignItems: "center",
		justifyContent: "center",
		gap: 24,
	},
	avatar: {
		width: 96,
		height: 96,
		borderRadius: 64,
		borderWidth: 2,
		borderColor: "#FFF",
		backgroundColor: variables.backgroundTertiary,
	},
	bannerInfo: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	text: {
		textAlign: "center",
		fontSize: 24,
		lineHeight: 24,
	},
	settings: {
		width: 48,
		height: 48,
		position: "absolute",
		top: 16,
		right: -8,
	},
});
