<script lang="ts">
	export let title: string;
	export let value: string;
</script>

<div
	class="dark:bg-primary flex flex-1 flex-col gap-4 rounded-lg bg-gradient-to-r from-[#00FFD1] to-[#9747FF] p-8 shadow-md"
>
	<p class="text-primary text-xl font-bold md:text-2xl">{title}</p>
	<p class={`text-primary text-2xl font-bold md:text-3xl `}>
		{#if value}
			{value}
		{:else}
			-
		{/if}
	</p>
</div>

<style>
</style>
