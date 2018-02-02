'use strict';

module.exports = function(chartData) {
  const doughnutConfig = {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: false,
      cutoutPercentage: 50,
      rotation: 0.5 * Math.PI,
      animation: {
        animateScale: true,
      },
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#fff',
        },
      },
    },
  };

  return doughnutConfig;
};
