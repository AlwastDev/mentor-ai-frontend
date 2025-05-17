/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const iconsDir = path.resolve(__dirname, "../src/assets/icons");
const outputFile = path.resolve(__dirname, "../src/assets/icons/index.ts");

function generateIconsFile() {
	const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith(".svg"));
	const imports = [];
	const exports = [];

	files.forEach((file) => {
		const name = path.basename(file, ".svg");
		const variableName = name.replace("_icon", "").replace(/-/g, "_");
		imports.push(`import ${variableName} from "@/assets/icons/${file}";`);
		exports.push(`  ${variableName},`);
	});

	const content = `
${imports.join("\n")}

export const icons = {
${exports.join("\n")}
};
`;

	fs.writeFileSync(outputFile, content);
	console.log("Icons file generated successfully!");
}

generateIconsFile();
