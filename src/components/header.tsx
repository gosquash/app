import { classes, variables } from "@/utils/styles";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import Text from "./text";

interface HeaderProps {
	title?: string;
}

export default function Header({ title }: HeaderProps) {

	return (
		<View style={styles.header}>
			<Link href="/">
				<Text bold style={classes(styles.logo)}>
					{title ? title : (
						<>
							Go<Text bold style={classes(styles.logo, styles.logoAccent)}>Squash</Text>
						</>
					)}
				</Text>
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		height: 48,
		backgroundColor: variables.background,
		borderBottomColor: variables.borderColor,
		borderBottomWidth: 1,
		paddingHorizontal: 24,
		marginHorizontal: -24,
		marginBottom: 16,

		flexDirection: "row",
		alignItems: "center",
	},
	logo: {
		fontSize: 24,
		fontWeight: "bold",
		padding: variables.gap,
	},
	logoAccent: {
		color: variables.accent,
	}
})
