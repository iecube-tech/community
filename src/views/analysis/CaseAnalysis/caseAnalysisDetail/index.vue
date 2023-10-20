<template>
    <div class="container">
        <div>
            <span>案例使用次数：{{ caseAnalysis.usedTime }}</span>
        </div>
        <div>
            <span>案例参与人数：{{ caseAnalysis.numberOfParticipant }}</span>
        </div>
        <div id="casescore" class="chart">
        </div>
        <div v-for="i in caseAnalysis.caseTaskScoreDistributionHistogram.length " :id="'casetask' + (i - 1)" class="chart">

        </div>

        <div style="width: 80%;">
            <span>案例改进建议使用统计</span>
            <el-table :data="caseAnalysis.tagCounterOfCase" :border="true" style="width: 100%">
                <el-table-column prop="taskNum" label="任务编号" />
                <el-table-column prop="name" label="Tag" />
                <el-table-column prop="suggestion" label="改进建议" />
                <el-table-column prop="times" label="总计出现次数" />
            </el-table>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import router from '@/router';
import { onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';

import { GetCaseAnalysis } from '@/apis/analysis/getCaseAnalysis.js';
import { onMounted } from 'vue';

const route = useRoute()
const routeName = route.name

const contentId = route.params.contentId

const caseAnalysis = ref({
    usedTime: null,
    numberOfParticipant: null,
    scoreDistributionHistogram: { x: [], y: [] },
    caseTaskScoreDistributionHistogram: [],
    tagCounterOfCase: [],
})

type EChartsOption = echarts.EChartsOption;


const initCaseScoreChart = () => {
    var option: EChartsOption;
    option = {
        title: {
            text: '案例所有参与人的总成绩分布直方图'
        },
        tooltip: {
        },
        xAxis: {
            name: '成绩',
            type: 'category',
            data: caseAnalysis.value.scoreDistributionHistogram.x,
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            name: '人数',
            type: 'value'
        },
        series: [
            {
                data: caseAnalysis.value.scoreDistributionHistogram.y,
                type: 'bar'
            }
        ]
    };

    var myChart = echarts.init(document.getElementById('casescore'));
    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}

const initCaseTaskScoreChart = () => {
    for (let i = 0; i < caseAnalysis.value.caseTaskScoreDistributionHistogram.length; i++) {
        var option: EChartsOption;
        option = {
            title: {
                text: '任务' + (i + 1) + '所有参与人的成绩分布直方图',
            },
            tooltip: {
            },
            xAxis: {
                name: '成绩',
                type: 'category',
                data: caseAnalysis.value.caseTaskScoreDistributionHistogram[i].x,
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: {
                name: '人数',
                type: 'value'
            },
            series: [
                {
                    data: caseAnalysis.value.caseTaskScoreDistributionHistogram[i].y,
                    type: 'bar'
                }
            ]
        };
        echarts.init(document.getElementById('casetask' + i)).setOption(option);
        window.addEventListener('resize', function () {
            echarts.init(document.getElementById('casetask' + i)).resize();
        });
    }
}



onBeforeMount(() => {
    GetCaseAnalysis(contentId).then(res => {
        if (res.state == 200) {
            caseAnalysis.value = res.data
        } else {
            ElMessage.error("获取数据异常")
        }
    })
})

onMounted(() => {
    setTimeout(() => {
        initCaseScoreChart();
        initCaseTaskScoreChart();
    }, 1500)
})
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.chart {
    height: 400px;
    width: 80%;
    margin-top: 30px;
}
</style>