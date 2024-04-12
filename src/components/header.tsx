import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeftLong } from "@fortawesome/pro-solid-svg-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { classes, variables } from "@/utils/styles";

import Text from "./text";
import { useNavigation } from "expo-router";

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

				<Text bold style={classes(styles.logo)}>
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
		height: 48,
		backgroundColor: variables.background,
		borderBottomColor: variables.borderColor,
		borderBottomWidth: 1,
		paddingHorizontal: 24,
		marginHorizontal: -24,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	logo: {
		fontSize: 24,
		fontWeight: "bold",
	},
	logoAccent: {
		color: variables.accent,
	},
});
