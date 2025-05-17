/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				blue: "0px 4px 0px 0px #1899D6",
				darkWhite: "0px 4px 0px 0px #E5E5E5",
			},
			colors: {
				white: "#ffffff",
				black: "#000000",
				gray: {
					900: "#4a4a4a",
					800: "#3d3d3d",
					700: "#363636",
					600: "#787878",
					500: "#949494",
					400: "#b0b0b0",
					300: "#d9d9d9",
					200: "#e6e6e6",
					100: "#ededed",
				},
				green: {
					light: "#59cc03",
					dark: "#42c72e",
				},
				blue: {
					light: "#1cb0f5",
					dark: "#3d4dff",
				},
				orange: {
					base: "#ff9600",
					bright: "#f7a300",
				},
				yellow: {
					bright: "#ffc700",
				},
				accent: {
					light: "#a6bad4",
				},
			},
		},
	},
};

export default config;
