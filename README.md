# North Charts Project

This project shows charts representing all the data comming from North API.

## Running Local

Clone this repository into your local machine and run the commands below. Make sure to have NodeJS v.22+

```
npm install
npm run dev
```

## Features

The App has a few filter features for each chart and table:

- Sort (Asc and Desc)
- Reset Original Data

### Sort

**Overview** - You can sort data on each chart by selecting between Ascending and Descending sorting through a Select component. The data will be sorted by the value data of each chart.

**Technical** - The Select component updates the orderFilterValue variable. The data is sorted based on order option and it recreates the chart with the updated data.

```ts
//Receives the original data
export let data: SavingTrend[];

//Type declaration for Select value
type OrderType = 'asc' | 'desc' | undefined;
let orderFilterValue: OrderType = undefined;

//Triggers on Select change
const handleChange = (e: Event) => {
	//Updates the Select value
	orderFilterValue = (e.target as HTMLSelectElement).value as OrderType;
};

//Everytime orderFilterValue is updated, the data is sorted based on option selected
$: if (orderFilterValue) {
	filteredData = [...data].sort((a, b) =>
		orderFilterValue === 'asc' ? a.savings - b.savings : b.savings - a.savings
	);

	//Recreates the chart with updated data
	createChart();
} else {
	//If there's no option selected, get the original data and recreated the chart
	filteredData = data;
	createChart();
}
```

### Reset

**Overview** - After you sort data, you can reset it to original state, making it shows the original data before you sorted it.

**Technical** - Reset button calls a function that sets orderFilterValue to undefined again, making it updated and sets the original data.

```ts
const resetData = () => {
	orderFilterValue = undefined;
};
```

## API Security

The API key is stored on a local .env file for local calls. The .gitignore file is configured to **NOT** send any .env files to github, so the production environment can be configurated on it's own rules.

The API key is accessed straight through an endpoint on server and never exposed on frontend. This way, the key keeps safe.
