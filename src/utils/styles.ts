export const variables = {
	background: "#131317",
	backgroundSecondary: "#171920",
	backgroundTertiary: "#1F222E",
	backgroundDarker: "#0C0C0E",

	borderColor: "#272A2E",

	accent: "#1CFEBA", // #5EDFA8
	color: "#fff",
	colorSecondary: "#8B8C8F",

	red: "#FF4757",

	header: {
		height: 72,
	},

	gap: 24,
	gapDouble: 48,
	gapHalf: 12,
	gapSmall: 8,
};

export function classes(...classes: Record<string, any>[]) {
	return classes.reduce((acc, style) => ({ ...acc, ...style }), {});
}
