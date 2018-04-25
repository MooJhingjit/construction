<script>
// CommitChart.js
// http://vue-chartjs.org/#/home
import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, {responsive: true, maintainAspectRatio: false, legend: {display: false}})
  }
}
</script>
