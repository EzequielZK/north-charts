<script lang="ts">
  export let onClick: (
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) => void;
</script>

<button
  on:click={onClick}
  class="p-2 shadow hover:cursor-pointer dark:bg-background rounded-lg active:scale-90 transition-all"
>
  <slot></slot>
</button>

<style>
</style>
