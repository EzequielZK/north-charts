export type SavingTrend = {
	month: string;
	savings: number;
};

export type SavingByCategory = {
	service: string;
	savings: number;
};

export type DetailedSaving = {
	date: string;
	service: string;
	amount: number;
};

export type Overview = {
	totalSavings: number;
	currentMonthSavings: number;
	percentageChange: number;
};

export type Data = {
	overview: Overview;
	savingsTrends: SavingTrend[];
	savingsByCategory: SavingByCategory[];
	detailedSavings: DetailedSaving[];
};
