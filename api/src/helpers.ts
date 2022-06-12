const getRandomInt = (min: number, max:any): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCurrentDate = (): string => new Date().toISOString().split('T')[0];

const arrayIntersect = (a: any[], b: any[]) => {
    const setA = new Set(a);
    const setB = new Set(b);
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
}

export {
	getRandomInt,
    getCurrentDate,
    arrayIntersect
}