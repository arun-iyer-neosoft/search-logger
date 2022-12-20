export interface LoggerDataType {
	actionType: string;
	applicationId: number | null;
	applicationType: string | null;
	companyId: number | null;
	creationTimestamp: string;
	ip: string;
	logId: number | null;
	logInfo: string | null;
	ownerId: number | null;
	source: string | null;
	userAgent: string;
	userId: number | null;
}

export interface BaseResponseType {
	elapsed: number;
	success: boolean;
	result: any;
}

export interface ColumnType {
	label: string;
	attribute: string;
	type?: "DATE";
	sortable?: boolean;
}

export interface SortType {
	field: keyof LoggerDataType | "";
	dir: "asc" | "dsc";
}
