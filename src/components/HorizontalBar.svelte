<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { Select, Tooltip } from "flowbite-svelte";
  import type { TooltipItem } from "chart.js";
  import type { SavingByCategory } from "../lib/types";
  import CustomIconButton from "./CustomIconButton.svelte";
  import { RotateCcw } from "@lucide/svelte";

  export let dataKey: keyof SavingByCategory;
  export let labelKey: keyof SavingByCategory;
  export let data: SavingByCategory[];
  export let dataLabel: string;

  export let title: string;

  let chartCanvas: HTMLCanvasElement | null = null;
  let chartInstance: Chart | null = null;

  type OrderType = "asc" | "desc" | undefined;
  let orderFilterValue: OrderType = undefined;

  const createChart = () => {
    if (!chartCanvas) return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: filteredData.map((item) => item[labelKey]),
        datasets: [
          {
            label: dataLabel,
            data: filteredData.map((item) => item[dataKey]),
            backgroundColor: "#D591FE",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context: TooltipItem<"bar">) => {
                const value = context.raw;

                if (typeof value === "number") {
                  return `${value.toLocaleString("pt-BR", { style: "currency", currency: "USD" })}`;
                }
                return "";
              },
            },
          },
          legend: {
            labels: {
              color: "#f8fcfd",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              callback: (value: number) => {
                return value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "USD",
                });
              },
              color: "#f8fcfd",
            },
          },
          y: {
            ticks: {
              color: "#f8fcfd",
            },
          },
        },
      },
    });
  };

  onMount(() => {
    createChart();
  });

  const handleChange = (e: Event) => {
    orderFilterValue = (e.target as HTMLSelectElement).value as OrderType;
  };

  let filteredData = [...data];

  $: if (orderFilterValue) {
    filteredData = [...data].sort((a, b) =>
      orderFilterValue === "asc" ? a.savings - b.savings : b.savings - a.savings
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
  class="dark:bg-primary dark:text-foreground rounded-lg p-4 md:p-8 md:flex-1 h-full flex flex-col shadow-md"
>
  <div class="flex justify-between items-center">
    <h2 class="md:text-3xl text-2xl font-bold flex-1">{title}</h2>
    <div class="flex gap-4">
      <div class="md:min-w-40">
        <Select
          class="flex-0 dark:bg-primary!"
          placeholder="Order"
          value={orderFilterValue || ""}
          on:change={handleChange}
          items={[
            { value: "asc", name: "Ascending" },
            { value: "desc", name: "Descending" },
          ]}
        />
      </div>
      <CustomIconButton onClick={resetData}>
        <RotateCcw />
      </CustomIconButton>
      <Tooltip class="dark:bg-background">Reset Data</Tooltip>
    </div>
  </div>
  <div class="flex-1 mt-6 min-h-72 md:min-h-0">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
</div>
