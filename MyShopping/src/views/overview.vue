<script setup>
import { onMounted, ref } from 'vue'
import echarts from '@/utils/echarts'
const histogram = ref('')
onMounted(()=>{
var myChart = echarts.init(histogram.value)
myChart.setOption({
    title: {
    text: '各类产品存量'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
})
})


</script>
<template>
    <div id="overview">
        <div id="histogram" ref="histogram">
        </div>
    </div>
</template>
<style lang="less" scoped>
#histogram{
    width: 50vw;
    height: 50vh;
}
</style>