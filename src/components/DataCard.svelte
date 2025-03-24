<script lang="ts">
	export let title: string;
	export let value: string;

	export let valueStyle: string = '';
</script>

<div class="dark:bg-primary flex flex-1 flex-col gap-4 rounded-lg p-8 shadow-md">
	<p class="text-xl font-bold md:text-2xl">{title}</p>
	<p class={`text-2xl font-bold md:text-3xl ${valueStyle}`}>
		{#if value}
			{value}
		{:else}
			-
		{/if}
	</p>
</div>

<style>
</style>
