const getRandomInt = (min: number, max:any): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCurrentDate = (): string => new Date().toISOString().split('T')[0];

export {
	getRandomInt,
    getCurrentDate
}