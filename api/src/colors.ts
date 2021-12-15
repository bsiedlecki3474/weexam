const colors = {
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m"
}

const isString = (obj: any) => typeof obj === "string";
const colorObj = (obj: any, color: string) =>
	color + (isString(obj) ? obj : JSON.stringify(obj)) + colors.white;

const red = (text: any) => colorObj(text, colors.red);
const green = (text: any) => colorObj(text, colors.green);
const yellow = (text: any) => colorObj(text, colors.yellow);
const blue = (text: any) => colorObj(text, colors.blue);
const magenta = (text: any) => colorObj(text, colors.magenta);
const cyan = (text: any) => colorObj(text, colors.cyan);

export {
	red,
	green,
	yellow,
	blue,
	magenta,
	cyan
}