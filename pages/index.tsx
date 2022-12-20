import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { DataTable } from "../components/DataTable";
import { FormControl } from "../components/FormControl";
import { Pagination } from "../components/Pagination";
import { Select } from "../components/Select";
import { LoggerDataType, SortType } from "../types";
import { findIfBetween } from "../utils/findIfBetween";
import { getUniqueOptions } from "../utils/getUniqueOptions";

interface FiltersType {
	logId: string | string[];
	action: string | string[];
	applicationType: string | string[];
	fromDate: string | string[];
	toDate: string | string[];
	applicationId: string | string[];
}

export default function Home({ data }: any) {
	const limit = 10;
	const [page, setPage] = useState(1);
	const [auditLogs, setAuditLogs] = useState<LoggerDataType[]>([]);
	const [filters, setFilters] = useState<FiltersType>({
		logId: "",
		action: "",
		applicationType: "",
		fromDate: "",
		toDate: "",
		applicationId: "",
	});
	const [sortDetails, setSortDetails] = useState<SortType>({
		field: "",
		dir: "asc",
	});
	const router = useRouter();
	const { logId, action, applicationType, fromDate, toDate, applicationId } =
		router.query;

	const actionList: string[] = data?.success
		? getUniqueOptions(data?.result?.auditLog, "actionType")
		: [];
	const applicationTypeList: string[] = data?.success
		? getUniqueOptions(data?.result?.auditLog, "applicationType")
		: [];
	const columns = [
		{ label: "Log Id", attribute: "logId" },
		{ label: "Application Type", attribute: "applicationType" },
		{ label: "Application ID", attribute: "applicationId" },
		{ label: "Action", attribute: "actionType" },
		{ label: "Action Details", attribute: "actionDetails" },
		{ label: "Date: Time", attribute: "creationTimestamp" },
	];

	// on change for inputs
	const handleFilterChange = (e: any) => {
		setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));
	};

	// on clicking search logger, the url is updated and subsequent useeffect triggers filter
	const filterData = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let temp = "/?";
		Object.keys(filters).forEach((filter) => {
			let val = filters[filter as keyof typeof filters];
			if (val) {
				temp = `${temp}${
					temp[temp.length - 1] !== "&" && temp[temp.length - 1] !== "?"
						? "&"
						: ""
				}${filter}=${val}`;
			}
		});
		router.push(temp, undefined, { shallow: true });
		setPage(1);
	};

	// sorts data as per sortdetails state and field attribute
	const handleSort = (attr: keyof LoggerDataType) => {
		let { dir, field } = sortDetails;
		if (field === attr) {
			dir === "asc" ? (dir = "dsc") : (dir = "asc");
		}
		if (field !== attr) {
			dir = "asc";
		}
		setAuditLogs((l) =>
			l.sort((a, b) => {
				let first = a[attr] || "";
				let second = b[attr] || "";
				if (dir === "asc") {
					return first > second ? 1 : second > first ? -1 : 0;
				}
				return second > first ? 1 : first > second ? -1 : 0;
			})
		);
		setSortDetails({ field: attr, dir });
	};

	// to filter data whenever query params or data is changed
	useEffect(() => {
		const getFilteredLogs = () => {
			let logs: LoggerDataType[] = data?.result?.auditLog || [];
			if (logId && typeof logId === "string") {
				logs = logs.filter((dat) => (dat.logId + "").search(logId) !== -1);
			}
			if (action && typeof action === "string") {
				logs = logs.filter((dat) => dat.actionType === action);
			}
			if (applicationType && typeof applicationType === "string") {
				logs = logs.filter((dat) => dat.applicationType === applicationType);
			}
			if (applicationId && typeof applicationId === "string") {
				logs = logs.filter(
					(dat) => (dat.applicationId + "").search(applicationId) !== -1
				);
			}
			if (fromDate && typeof fromDate === "string" && !toDate) {
				logs = logs.filter(
					(dat) => dat.creationTimestamp.split(" ")[0] === fromDate
				);
			}
			if (
				fromDate &&
				typeof fromDate === "string" &&
				toDate &&
				typeof toDate === "string"
			) {
				logs = logs.filter((dat) =>
					findIfBetween(dat.creationTimestamp, fromDate, toDate)
				);
			}
			return logs;
		};
		setAuditLogs(getFilteredLogs());
	}, [data, logId, applicationId, applicationType, action, fromDate, toDate]);

	// to update filters state whenever query params are updated
	useEffect(() => {
		setFilters({
			logId: logId || "",
			action: action || "",
			applicationType: applicationType || "",
			fromDate: fromDate || "",
			toDate: toDate || "",
			applicationId: applicationId || "",
		});
	}, [logId, applicationId, applicationType, fromDate, toDate, action]);

	return (
		<>
			<Head>
				<title>Search Logger</title>
			</Head>
			<main className='p-10'>
				{data.success ? (
					<div>
						<form onSubmit={filterData}>
							<div className='flex flex-wrap items-center gap-6 mb-6'>
								<FormControl
									label='Log ID'
									name='logId'
									value={filters.logId}
									onChange={(e) => handleFilterChange(e)}
								/>
								<FormControl
									label='Action Name'
									name='action'
									CustomInput={() => (
										<Select
											name='action'
											value={filters.action}
											onChange={(e) => handleFilterChange(e)}
										>
											{actionList.map((action) => {
												return (
													<option value={action} key={action}>
														{action}
													</option>
												);
											})}
										</Select>
									)}
								/>
								<FormControl
									label='Application Type'
									name='applicationType'
									CustomInput={() => (
										<Select
											name='applicationType'
											value={filters.applicationType}
											onChange={(e) => handleFilterChange(e)}
										>
											{applicationTypeList.map((action) => {
												return (
													<option value={action} key={action}>
														{action}
													</option>
												);
											})}
										</Select>
									)}
								/>
								<FormControl
									type='date'
									label='From Date'
									name='fromDate'
									value={filters.fromDate}
									onChange={(e) => handleFilterChange(e)}
								/>
								<FormControl
									type='date'
									label='To Date'
									name='toDate'
									value={filters.toDate}
									onChange={(e) => handleFilterChange(e)}
								/>
								<FormControl
									label='Application Id'
									name='applicationId'
									value={filters.applicationId}
									onChange={(e) => handleFilterChange(e)}
								/>
							</div>
							<div className='flex gap-6 justify-end items-center'>
								<Button
									onClick={() => router.push("/", undefined, { shallow: true })}
									color='gray'
								>
									Reset Filters
								</Button>
								<Button type='submit'>Search Logger</Button>
							</div>
						</form>
						<DataTable
							data={auditLogs}
							columns={columns}
							keyField='logId'
							page={page}
							limit={limit}
							handleSort={handleSort}
							sortDetails={sortDetails}
						/>
						<Pagination
							page={page}
							setPage={setPage}
							limit={limit}
							total={auditLogs.length}
						/>
					</div>
				) : (
					<div>An error occurred while fetching data</div>
				)}
			</main>
		</>
	);
}

export const getServerSideProps = async () => {
	const res = await fetch(
		"https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
	);
	const data = await res.json();
	return { props: { data } };
};
