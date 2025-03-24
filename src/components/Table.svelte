<script lang="ts">
	import {
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { DetailedSaving } from '../lib/types.js';

	export let title: string;

	export let data: DetailedSaving[] = [];
</script>

<div class=" dark:bg-primary flex flex-1 flex-col gap-6 rounded-lg p-8 shadow-md">
	<h1 class="flex-1 text-2xl font-bold md:text-3xl">{title}</h1>

	<div
		class="flex-[1_0_300px] overflow-x-hidden overflow-y-auto md:overflow-hidden md:hover:overflow-y-auto"
	>
		<Table striped={true} items={data}>
			<TableHead class="dark:bg-foreground ">
				<TableHeadCell
					sort={(a: DetailedSaving, b: DetailedSaving) => a.date.localeCompare(b.date)}
					defaultSort
					class="dark:text-primary first-of-type:rounded-tl-lg last-of-type:rounded-tr-lg"
					>DATE</TableHeadCell
				>
				<TableHeadCell
					sort={(a: DetailedSaving, b: DetailedSaving) => a.service.localeCompare(b.service)}
					defaultSort
					class="dark:text-primary first-of-type:rounded-tl-lg last-of-type:rounded-tr-lg"
					>SERVICE</TableHeadCell
				>
				<TableHeadCell
					defaultSort
					sort={(a: DetailedSaving, b: DetailedSaving) => a.amount - b.amount}
					class="dark:text-primary first-of-type:rounded-tl-lg last-of-type:rounded-tr-lg "
					>AMOUNT</TableHeadCell
				>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				<TableBodyRow
					class="dark:odd:bg-primary! dark:even:bg-background odd:bg-primary/20 even:bg-background/10 border-none"
					slot="row"
					let:item
				>
					<TableBodyCell>{(item as DetailedSaving).date}</TableBodyCell>
					<TableBodyCell>{(item as DetailedSaving).service}</TableBodyCell>
					<TableBodyCell
						>{(item as DetailedSaving).amount.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'USD'
						})}</TableBodyCell
					>
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>
</div>
