<script>
// CommitChart.js
// http://vue-chartjs.org/#/home
// https://www.npmjs.com/package/vue-chartjs
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {display: false},
      scales: {
        xAxes: [{
          display: false
        }]
      }
    })
  }
}
</script>
