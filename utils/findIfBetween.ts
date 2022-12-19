export const findIfBetween = (
	creationTimestamp: string,
	fromDate: string,
	toDate: string
) => {
	let created = new Date(creationTimestamp).getTime();
	let from = new Date(fromDate).getTime();
	let to = new Date(toDate).getTime();

	return created >= from && created <= to;
};
