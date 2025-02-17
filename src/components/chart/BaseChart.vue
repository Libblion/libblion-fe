<script setup>
import { defineProps } from "vue";
import { Bar, Pie, Line, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  type: String,
  chartData: Object,
  chartOptions: Object,
});

const chartComponents = {
  bar: Bar,
  pie: Pie,
  line: Line,
  doughnut: Doughnut,
};
</script>

<template>
    <component :is="chartComponents[type]" :data="chartData" :options="chartOptions" />
</template>
