<template>
    <div class="rounded-md p-2">
        <h1 class="text-2xl font-semibold">Fine Money</h1>
        <div class="h-full max-sm:h-64 flex items-center">
            <BaseChart :chart-data="data" :chart-options="options" type="bar"></BaseChart>
        </div>
    </div>
</template>

<script setup>
import BaseChart from '@/components/chart/BaseChart.vue'

const data = {
    labels: ['January', 'February', 'March'],
    datasets: [
        { 
            data: [40, 20, 12],
            backgroundColor: ['#8E6EFF','#FFB22C'], 

        }
    ],

}
const options = {
    responsive: true
}
</script>