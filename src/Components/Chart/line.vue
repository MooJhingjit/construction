<script>
// CommitChart.js
// http://vue-chartjs.org/#/home
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, {maintainAspectRatio: false, legend: {display: true}})
  }
}
</script>
