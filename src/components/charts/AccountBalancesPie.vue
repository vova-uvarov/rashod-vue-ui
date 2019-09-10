<template>
    <div class="small">
        <PieChart :chart-data="datacollection" :options="options"></PieChart>
    </div>
</template>

<script>
    import PieChart from './PieChart.js'
    import AccountService from "@/services/AccountService";

    export default {
        components: {
            PieChart
        },
        data() {
            return {
                balances: [],
                datacollection: null,
                options: {
                    title: {
                        display: true,
                        text: "Деньги по счетам"
                    },
                    legend:
                        {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true
                            }
                        }
                }
            }
        },
        mounted() {
            AccountService.loadBalances()
                .then((balances) => {
                    this.balances = balances;
                    this.fillData()
                });
        },
        methods: {
            fillData() {
                this.datacollection = {
                    datasets: [{
                        backgroundColor: this.balances.map((a) => (a.color)),
                        data: this.balances.map((a) => (a.balance))
                    }],


                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: this.balances.map((a) => (a.accountName + ":" + a.balance))


                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (150 - 5 + 1)) + 5
            }
        }
    }
</script>

<style>
    .small {
        max-width: 400px;
        margin: 100px auto;
    }
</style>
