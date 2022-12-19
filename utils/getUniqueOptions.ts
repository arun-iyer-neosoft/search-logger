export const getUniqueOptions = (data: any[], attribute: string) => {
	let temp = data.map((dat) => dat[attribute]);
	temp = [...new Set(temp)];
	temp = temp.filter((v) => !!v);
	return temp;
};
