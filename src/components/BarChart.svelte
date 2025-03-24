<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import Select from 'flowbite-svelte/Select.svelte';
	import Tooltip from 'flowbite-svelte/Tooltip.svelte';
	import type { TooltipItem } from 'chart.js';
	import type { SavingTrend } from '../lib/index.ts';
	import CustomIconButton from './CustomIconButton.svelte';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';

	export let dataKey: keyof SavingTrend;
	export let labelKey: keyof SavingTrend;
	export let data: SavingTrend[];
	export let dataLabel: string;
	export let isDarkMode: boolean;

	export let title: string;

	let chartCanvas: HTMLCanvasElement | null = null;
	let chartInstance: Chart<'bar', (string | number)[], string | number>;

	type OrderType = 'asc' | 'desc' | undefined;
	let orderFilterValue: OrderType = undefined;

	const createChart = () => {
		if (!chartCanvas) return;

		if (chartInstance) {
			chartInstance.destroy();
		}

		chartInstance = new Chart(chartCanvas, {
			type: 'bar',
			data: {
				labels: filteredData.map((item) => item[labelKey]),
				datasets: [
					{
						label: dataLabel,
						data: filteredData.map((item) => item[dataKey]),
						backgroundColor: '#00FFD1',
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					tooltip: {
						enabled: true,
						callbacks: {
							label: (context: TooltipItem<'bar'>) => {
								const value = context.raw;

								if (typeof value === 'number') {
									return `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}`;
								}
								return '';
							}
						}
					},
					legend: {
						labels: {
							color: isDarkMode ? '#f8fcfd' : '#1e2125'
						}
					}
				},

				scales: {
					y: {
						ticks: {
							callback: (value: number | string) => {
								return value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'USD'
								});
							},
							color: isDarkMode ? '#f8fcfd' : '#1e2125'
						}
					},
					x: {
						ticks: {
							color: isDarkMode ? '#f8fcfd' : '#1e2125'
						}
					}
				}
			}
		});
	};

	$: if (isDarkMode) {
		createChart();
	} else {
		createChart();
	}

	onMount(() => {
		createChart();
	});

	const handleChange = (e: Event) => {
		orderFilterValue = (e.target as HTMLSelectElement).value as OrderType;
	};

	let filteredData = [...data];

	$: if (orderFilterValue) {
		filteredData = [...data].sort((a, b) =>
			orderFilterValue === 'asc' ? a.savings - b.savings : b.savings - a.savings
		);

		createChart();
	} else {
		filteredData = data;
		createChart();
	}

	const resetData = () => {
		orderFilterValue = undefined;
	};
</script>

<div
	class="dark:bg-primary dark:text-foreground bg-foreground flex flex-col rounded-lg p-4 shadow-md md:flex-1 md:p-8"
>
	<div class="flex items-center justify-between">
		<h2 class="flex-1 text-2xl font-bold md:text-3xl">{title}</h2>
		<div class="flex gap-4">
			<div class="md:min-w-40">
				<Select
					class="dark:bg-primary! bg-foreground! flex-0"
					placeholder="Order"
					value={orderFilterValue || ''}
					on:change={handleChange}
					items={[
						{ value: 'asc', name: 'Ascending' },
						{ value: 'desc', name: 'Descending' }
					]}
				/>
			</div>
			<CustomIconButton onClick={resetData}>
				<RotateCcw />
			</CustomIconButton>
			<Tooltip class="dark:bg-background">Reset Data</Tooltip>
		</div>
	</div>
	<div class="mt-6 min-h-72 flex-1 md:min-h-0">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
</div>
