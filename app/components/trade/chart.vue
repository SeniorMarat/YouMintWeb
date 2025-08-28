<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import * as d from "date-fns"
import { Line as lineChart } from "vue-chartjs"

import type { ChartData, DashboardInterval } from "#server/utils"

const props = defineProps<{
  interval: DashboardInterval
  data: ChartData
}>()

// Регистрируем нужные элементы и скейлы
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
)

function formatTimestampForChartInterval(interval: DashboardInterval, timestamp: string) {
  switch (interval) {
    case "hour":
      return d.format(timestamp, "HH:mm")
    case "day":
      return d.format(timestamp, "HH:mm")
    case "week":
      return d.format(timestamp, "MMM d")
    case "month":
      return d.format(timestamp, "MMM d")
  }
}

const labels = computed(() => props.data.map(([label]) => formatTimestampForChartInterval(props.interval, label)) || [])
const values = computed(() => props.data.map(([_, value]) => value) || [])

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "Requests",
      data: values.value,
      borderColor: "#fb4919",
      backgroundColor: "#fb4919",
      tension: 0.3,
      pointRadius: 3,
      pointHoverRadius: 3,
      fill: true,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: "#6c6b73", padding: 18 },
      grid: { color: "#27252c" },
    },
    y: {
      ticks: { color: "#6c6b73", padding: 18 },
      grid: { color: "#27252c" },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
}
</script>

<template lang="pug">
.chart: line-chart(:data="chartData" :options="chartOptions")
</template>

<style module lang="scss">
.chart {
  height: 287px;
}
</style>
