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
    this.renderChart(this.data, {
      maintainAspectRatio: false,
      legend: {display: true},
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index]
            if (parseInt(value) >= 1000) {
              return 'ยอดเงินรวม ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' บาท'
            } else {
              return 'ยอดเงินรวม ' + value + ' บาท'
            }
          }
        } // end callbacks:
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              } else {
                return value
              }
            }
          }
        }]
      }
    })
  }
}
</script>
