import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeftLong } from "@fortawesome/pro-solid-svg-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { classes, variables } from "@/utils/styles";

import Text from "./text";

interface HeaderProps {
	title?: React.ReactNode;
	children?: React.ReactNode;

	backButton?: boolean;
}

export default function Header({ backButton, children, title }: HeaderProps) {
	const navigation = useNavigation();

	function goBack() {
		return navigation.goBack();
	}

	return (
		<View style={styles.header}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
				{backButton && navigation.canGoBack() && (
					<TouchableOpacity onPress={goBack}>
						<FontAwesomeIcon icon={faArrowLeftLong} color="#fff" size={20} />
					</TouchableOpacity>
				)}
			</View>

			<View style={styles.logoContainer}>
				<Text bold style={styles.logo}>
					{title ? (
						title
					) : (
						<>
							Go
							<Text bold style={classes(styles.logo, styles.logoAccent)}>
								Squash
							</Text>
						</>
					)}
				</Text>
			</View>

			<View>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		position: "relative",
		height: 48,
		backgroundColor: variables.background,
		borderBottomColor: variables.borderColor,
		borderBottomWidth: 1,
		paddingHorizontal: 24,
		marginHorizontal: -32,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	logoContainer: {
		...StyleSheet.absoluteFillObject,
		zIndex: -1,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		textAlign: "center",
		textAlignVertical: "center",

		fontSize: 20,
		fontWeight: "bold",
	},
	logoAccent: {
		color: variables.accent,
	},
});
