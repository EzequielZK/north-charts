<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import BarChart from '../components/BarChart.svelte';
	import DataCard from '../components/DataCard.svelte';
	import HorizontalBar from '../components/HorizontalBar.svelte';
	import Table from '../components/Table.svelte';
	import { Spinner } from 'flowbite-svelte';
	import type {
		Data,
		DetailedSaving,
		Overview,
		SavingByCategory,
		SavingTrend
	} from '../lib/index.ts';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props() as { data: Data };

	let loadingLogo: boolean = $state(true);
	let overview: Overview = data.overview;

	let savingsTrends: SavingTrend[] = data.savingsTrends;

	let savingsByCategory: SavingByCategory[] = data.savingsByCategory;

	let detailedSavings: DetailedSaving[] = data.detailedSavings;

	let darkModeQuery: MediaQueryList;

	let isDarkMode: boolean = $state(false);

	const checkDarkMode = () => {
		darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		isDarkMode = darkModeQuery.matches;
		loadingLogo = false;
	};

	onMount(() => {
		checkDarkMode();
		darkModeQuery.addEventListener('change', checkDarkMode);
	});
</script>

<main class="h-full">
	<header class="dark:bg-primary bg-foreground sticky top-0 px-8 py-4 shadow-md">
		{#if loadingLogo}
			<Spinner color="white" size={8} />
		{:else if isDarkMode}
			<img alt="Logo" src="/img/logo.png" class="w-32 object-cover md:w-48" />
		{:else}
			<img alt="Logo" src="/img/white-logo.png" class="w-32 object-cover md:w-48" loading="lazy" />
		{/if}
	</header>
	<section class="flex h-full flex-wrap gap-6 p-4 transition-all md:items-stretch md:p-8">
		<div class="flex w-full flex-1 flex-col gap-6 md:w-max md:flex-[1_0_480px]">
			<div class="flex flex-col flex-wrap gap-6 md:flex-row">
				<DataCard
					title="Total Savings"
					value={overview?.totalSavings.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'USD'
					})}
				/>
				<DataCard
					title="Current Month Savings"
					value={overview?.currentMonthSavings.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'USD'
					})}
				/>
				<DataCard title="Percentage Change" value={`${overview?.percentageChange}%`} />
			</div>

			<BarChart
				{isDarkMode}
				labelKey="month"
				dataKey="savings"
				dataLabel="Savings"
				data={savingsTrends}
				title="Saving Trends"
			/>
		</div>
		<div class="flex h-full w-full flex-1 flex-col gap-6">
			<div class="md:flex-[1_0_400px]">
				<HorizontalBar
					{isDarkMode}
					labelKey="service"
					dataKey="savings"
					dataLabel="Categories"
					data={savingsByCategory}
					title="Savings By Category"
				/>
			</div>

			<Table data={detailedSavings} title="Detailed Savings" />
		</div>
	</section>
</main>

<style>
</style>
